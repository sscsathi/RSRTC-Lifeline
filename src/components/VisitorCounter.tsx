import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const PREVIOUS_VISITS = 64;
const ABACUS_BASE = 'https://abacus.jasoncameron.dev';
const ABACUS_NAMESPACE = 'rsrtc-lifeline.vercel.app';
const ABACUS_KEY = 'visits';
const COUNTERAPI_BASE = 'https://api.counterapi.dev/v1/rsrtc-lifeline-rajasthan/visits';
const SESSION_COUNTED_KEY = 'rsrtc_visit_counted';
const LOCAL_LAST_COUNT_KEY = 'rsrtc_last_visits_count';
const FETCH_TIMEOUT_MS = 4000;

let inFlightFetch: Promise<number> | null = null;

function parseNumericCount(raw: unknown): number | null {
  const parsed = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : null;
}

function parseCounterResponse(data: unknown): number | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  return parseNumericCount(record.value ?? record.count);
}

function readCachedCount(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_LAST_COUNT_KEY);
    if (raw === null) return null;
    return parseNumericCount(raw);
  } catch {
    return null;
  }
}

function getInitialVisitCount(): number {
  return Math.max(readCachedCount() ?? 0, PREVIOUS_VISITS);
}

function writeCachedCount(count: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_LAST_COUNT_KEY, String(count));
  } catch {
    // Ignore storage quota or privacy-mode errors
  }
}

async function fetchCountWithTimeout(
  url: string,
  timeoutMs: number = FETCH_TIMEOUT_MS
): Promise<number | null> {
  const controller = new AbortController();
  const timerId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return parseCounterResponse(data);
  } catch {
    return null;
  } finally {
    window.clearTimeout(timerId);
  }
}

async function fetchVisitCount(): Promise<number> {
  const cached = getInitialVisitCount();

  if (typeof window === 'undefined') return cached;
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return cached;
  }

  let alreadyCounted = false;
  try {
    alreadyCounted = window.sessionStorage.getItem(SESSION_COUNTED_KEY) === '1';
  } catch {
    alreadyCounted = false;
  }

  let totalVal: number | null = null;

  if (!alreadyCounted) {
    const liveVal = await fetchCountWithTimeout(
      `${ABACUS_BASE}/hit/${ABACUS_NAMESPACE}/${ABACUS_KEY}`
    );
    if (liveVal !== null) {
      totalVal = PREVIOUS_VISITS + liveVal;
    } else {
      const fallbackVal = await fetchCountWithTimeout(`${COUNTERAPI_BASE}/up`);
      if (fallbackVal !== null) {
        totalVal = Math.max(fallbackVal, PREVIOUS_VISITS);
      }
    }

    if (totalVal !== null) {
      try {
        window.sessionStorage.setItem(SESSION_COUNTED_KEY, '1');
      } catch {
        // Ignore storage access errors
      }
    }
  } else {
    const liveVal = await fetchCountWithTimeout(
      `${ABACUS_BASE}/get/${ABACUS_NAMESPACE}/${ABACUS_KEY}`
    );
    if (liveVal !== null) {
      totalVal = PREVIOUS_VISITS + liveVal;
    } else {
      const fallbackVal = await fetchCountWithTimeout(`${COUNTERAPI_BASE}/`);
      if (fallbackVal !== null) {
        totalVal = Math.max(fallbackVal, PREVIOUS_VISITS);
      }
    }
  }

  if (totalVal !== null) {
    const finalCount = Math.max(totalVal, cached);
    writeCachedCount(finalCount);
    return finalCount;
  }

  return cached;
}

function getVisitCountOnce(): Promise<number> {
  if (!inFlightFetch) {
    inFlightFetch = fetchVisitCount().finally(() => {
      inFlightFetch = null;
    });
  }
  return inFlightFetch;
}

export const VisitorCounter: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(() => getInitialVisitCount());

  useEffect(() => {
    let active = true;
    getVisitCountOnce().then((count) => {
      if (active) {
        setVisitCount((prev) => Math.max(count, prev));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const formattedCount = visitCount.toLocaleString('en-IN');

  return (
    <div className="mt-8 -mb-3 flex justify-center">
      <div
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#EAECEF] shadow-xs text-xs font-medium text-slate-600 tabular-nums"
        aria-label={`Total Visits: ${formattedCount}`}
      >
        <Eye className="w-3.5 h-3.5 text-[#D81B60] shrink-0" aria-hidden="true" />
        <span>
          Total Visits:{' '}
          <strong className="font-bold text-slate-800">{formattedCount}</strong>
        </span>
      </div>
    </div>
  );
};
