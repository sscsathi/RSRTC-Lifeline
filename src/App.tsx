/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { Header, ActiveModalType } from './components/Header';
import { SlideOutDrawer } from './components/SlideOutDrawer';
import { SearchWidget } from './components/SearchWidget';
import { HeritageCarousel } from './components/HeritageCarousel';
import { PopularRoutes } from './components/PopularRoutes';
import { SearchResultsView } from './components/SearchResultsView';
import { TimetableBookingModal } from './components/TimetableBookingModal';
import { RecentSearchesSheet } from './components/RecentSearchesSheet';
import { DrawerModals } from './components/DrawerModals';
import {
  BusFilterOption,
  BusService,
  PopularRoute,
  RecentSearch,
  generateBusSchedules,
  findCityById,
  getCityById,
  getLocalTodayIso,
} from './data/rsrtcData';

const STORAGE_KEY_RECENT = 'rsrtc_lifeline_recent_v3';

function isValidRecentSearch(item: unknown): item is RecentSearch {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.fromId === 'string' &&
    candidate.fromId.length > 0 &&
    typeof candidate.toId === 'string' &&
    candidate.toId.length > 0 &&
    typeof candidate.fromName === 'string' &&
    typeof candidate.toName === 'string' &&
    typeof candidate.dateIso === 'string' &&
    typeof candidate.busFilter === 'string' &&
    typeof candidate.searchedAt === 'string'
  );
}

export default function App() {
  const [todayIso, setTodayIso] = useState<string>(() => getLocalTodayIso());
  const [fromId, setFromId] = useState<string>('');
  const [toId, setToId] = useState<string>('');
  const [dateIso, setDateIso] = useState<string>(() => getLocalTodayIso());
  const [busFilter, setBusFilter] = useState<BusFilterOption>('All');
  const [activeView, setActiveView] = useState<'home' | 'results'>('home');

  // Keep todayIso in sync if the tab stays open across local midnight
  useEffect(() => {
    const syncToday = () => {
      const current = getLocalTodayIso();
      setTodayIso((prev) => (prev === current ? prev : current));
      setDateIso((prev) => (prev < current ? current : prev));
    };
    const intervalId = window.setInterval(syncToday, 60_000);
    window.addEventListener('focus', syncToday);
    document.addEventListener('visibilitychange', syncToday);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', syncToday);
      document.removeEventListener('visibilitychange', syncToday);
    };
  }, []);

  // Navigation & overlays
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [recentSheetOpen, setRecentSheetOpen] = useState(false);

  // Bus Timetable modal
  const [selectedBus, setSelectedBus] = useState<BusService | null>(null);

  // Persisted Recent Searches (strictly per-browser localStorage, starts empty for new visitors)
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_RECENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(isValidRecentSearch);
        }
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    try {
      if (recentSearches.length === 0) {
        window.localStorage.removeItem(STORAGE_KEY_RECENT);
      } else {
        window.localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(recentSearches));
      }
    } catch {
      // ignore
    }
  }, [recentSearches]);

  const busSchedules = useMemo(
    () => (fromId && toId ? generateBusSchedules(fromId, toId, dateIso) : []),
    [fromId, toId, dateIso]
  );

  const recordSearch = (
    nextFromId: string,
    nextToId: string,
    nextDateIso: string,
    nextFilter: BusFilterOption
  ) => {
    const fromCity = getCityById(nextFromId);
    const toCity = getCityById(nextToId);
    const entry: RecentSearch = {
      id: `${nextFromId}-${nextToId}-${Date.now()}`,
      fromId: nextFromId,
      toId: nextToId,
      fromName: fromCity.name,
      toName: toCity.name,
      dateIso: nextDateIso,
      busFilter: nextFilter,
      searchedAt: 'Just now',
    };

    setRecentSearches((prev) => {
      const deduped = prev.filter(
        (item) =>
          !(
            item.fromId === nextFromId &&
            item.toId === nextToId &&
            item.dateIso === nextDateIso
          )
      );
      return [entry, ...deduped].slice(0, 8);
    });
  };

  const handleChangeDate = (nextIso: string) => {
    const currentToday = getLocalTodayIso();
    if (currentToday !== todayIso) {
      setTodayIso(currentToday);
    }
    setDateIso(nextIso < currentToday ? currentToday : nextIso);
  };

  const executeSearch = (
    nextFrom = fromId,
    nextTo = toId,
    nextDate = dateIso,
    nextFilter = busFilter
  ) => {
    const validFrom = findCityById(nextFrom);
    const validTo = findCityById(nextTo);
    if (!validFrom || !validTo || validFrom.id === validTo.id) {
      return;
    }
    const currentToday = getLocalTodayIso();
    if (currentToday !== todayIso) {
      setTodayIso(currentToday);
    }
    const safeDate = nextDate < currentToday ? currentToday : nextDate;
    setFromId(validFrom.id);
    setToId(validTo.id);
    setDateIso(safeDate);
    setBusFilter(nextFilter);
    recordSearch(validFrom.id, validTo.id, safeDate, nextFilter);
    setActiveView('results');
    setRecentSheetOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwapCities = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const handleSelectPopularRoute = (route: PopularRoute) => {
    executeSearch(route.fromId, route.toId, dateIso, 'All');
  };

  const handleSelectRecentSearch = (item: RecentSearch) => {
    const safeDate = item.dateIso < todayIso ? todayIso : item.dateIso;
    executeSearch(item.fromId, item.toId, safeDate, item.busFilter);
  };

  const handleGoHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoPopularRoutes = () => {
    setActiveView('home');
    window.setTimeout(() => {
      const el = document.getElementById('popular-routes-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-slate-900">
      <Header
        onOpenDrawer={() => setDrawerOpen(true)}
        onGoHome={handleGoHome}
        onPopularRoutes={handleGoPopularRoutes}
        onOpenModal={(modal) => setActiveModal(modal)}
        activeView={activeView}
      />

      <main className="flex-1">
        {activeView === 'home' ? (
          <>
            <SearchWidget
              fromId={fromId}
              toId={toId}
              dateIso={dateIso}
              todayIso={todayIso}
              busFilter={busFilter}
              onChangeFrom={setFromId}
              onChangeTo={setToId}
              onSwapCities={handleSwapCities}
              onChangeDate={handleChangeDate}
              onChangeBusFilter={setBusFilter}
              onSearch={() => executeSearch()}
            />

            <HeritageCarousel
              onQuickAction={(qFrom, qTo, qFilter) =>
                executeSearch(qFrom, qTo, dateIso, qFilter)
              }
            />

            <PopularRoutes onSelectRoute={handleSelectPopularRoute} />
          </>
        ) : (
          <SearchResultsView
            fromId={fromId}
            toId={toId}
            dateIso={dateIso}
            todayIso={todayIso}
            busFilter={busFilter}
            buses={busSchedules}
            onBack={handleGoHome}
            onSwap={handleSwapCities}
            onChangeDate={handleChangeDate}
            onChangeBusFilter={setBusFilter}
            onOpenTimetable={(bus) => setSelectedBus(bus)}
          />
        )}
      </main>

      {/* Pull-Up Recent Searches Sheet */}
      <RecentSearchesSheet
        isOpen={recentSheetOpen}
        onToggle={() => setRecentSheetOpen((open) => !open)}
        onClose={() => setRecentSheetOpen(false)}
        searches={recentSearches}
        onSelectSearch={handleSelectRecentSearch}
        onClearAll={() => setRecentSearches([])}
      />

      {/* Left Slide-Out Navigation Drawer */}
      <SlideOutDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSearchBuses={handleGoHome}
        onPopularRoutes={handleGoPopularRoutes}
        onSelectModal={(modal) => setActiveModal(modal)}
      />

      {/* Bus Timetable Modal */}
      <TimetableBookingModal
        bus={selectedBus}
        dateIso={dateIso}
        onClose={() => setSelectedBus(null)}
      />

      {/* Utility Modals (Helpline, All 50 Depots, Report Timing) */}
      <DrawerModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSearchFromDepot={(cFrom, cTo) =>
          executeSearch(cFrom, cTo, dateIso, 'All')
        }
      />
    </div>
  );
}
