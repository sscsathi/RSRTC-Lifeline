import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const COUNTER_BASE_URL = 'https://countapi.mileshilliard.com/api/v1';
const COUNTER_KEY = 'rsrtc-lifeline-rajasthan-visits';
const SESSION_COUNTED_KEY = 'rsrtc_visit_counted';
const SESSION_CACHE_KEY = 'rsrtc_visit_count_cache';

let inFlightFetch: Promise<number | null> | null = null;

function parseCounterValue(data: unknown): number | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  const raw = record.value ?? record.count;
  const parsed = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : null;
}

async function fetchVisitCount(): Promise<number | null> {
  if (typeof window === 'undefined' || typeof navigator !== 'undefined' && !navigator.onLine) {
    return null;
  }

  let alreadyCounted = false;
  try {
    alreadyCounted = window.sessionStorage.getItem(SESSION_COUNTED_KEY) === '1';
  } catch {
    alreadyCounted = false;
  }

  const endpoint = alreadyCounted
    ? `${COUNTER_BASE_URL}/get/${COUNTER_KEY}`
    : `${COUNTER_BASE_URL}/hit/${COUNTER_KEY}`;

  try {
    let response = await fetch(endpoint, { method: 'GET', cache: 'no-store' });

    if (alreadyCounted && response.status === 404) {
      response = await fetch(`${COUNTER_BASE_URL}/hit/${COUNTER_KEY}`, {
        method: 'GET',
        cache: 'no-store',
      });
    }

    if (!response.ok) return null;

    const data: unknown = await response.json();
    const count = parseCounterValue(data);
    if (count === null) return null;

    try {
      window.sessionStorage.setItem(SESSION_COUNTED_KEY, '1');
      window.sessionStorage.setItem(SESSION_CACHE_KEY, String(count));
    } catch {
      // Ignore storage quota or privacy-mode errors
    }

    return count;
  } catch {
    return null;
  }
}

function getVisitCountOnce(): Promise<number | null> {
  if (!inFlightFetch) {
    inFlightFetch = fetchVisitCount().finally(() => {
      inFlightFetch = null;
    });
  }
  return inFlightFetch;
}

export const VisitorCounter: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number | null>(() => {
    try {
      const cached = window.sessionStorage.getItem(SESSION_CACHE_KEY);
      if (cached !== null) {
        const num = Number(cached);
        if (Number.isFinite(num) && num >= 0) return Math.floor(num);
      }
    } catch {
      // Ignore storage access errors
    }
    return null;
  });

  useEffect(() => {
    let active = true;
    getVisitCountOnce().then((count) => {
      if (active && count !== null) {
        setVisitCount(count);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (visitCount === null) return null;

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
