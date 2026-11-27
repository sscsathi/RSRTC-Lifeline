import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  SlidersHorizontal,
  Bus,
  ListOrdered,
} from 'lucide-react';
import {
  BusFilterOption,
  BusService,
  formatIsoDateParts,
  getCityById,
  shiftIsoDate,
} from '../data/rsrtcData';

const FILTER_OPTIONS: BusFilterOption[] = [
  'All',
  'Ordinary',
  'Express',
  'Deluxe',
  'Volvo AC',
  'Sleeper',
];
type SortOption = 'departure' | 'duration';

interface SearchResultsViewProps {
  fromId: string;
  toId: string;
  dateIso: string;
  todayIso: string;
  busFilter: BusFilterOption;
  buses: BusService[];
  onBack: () => void;
  onSwap: () => void;
  onChangeDate: (iso: string) => void;
  onChangeBusFilter: (filter: BusFilterOption) => void;
  onOpenTimetable: (bus: BusService) => void;
}

function getCategoryStyle(category: BusService['category']): string {
  switch (category) {
    case 'Super Luxury Volvo':
      return 'bg-[#FDF2F6] text-[#B0124D] border-[#F8BBD0]';
    case 'Super Deluxe':
      return 'bg-rose-50 text-[#B0124D] border-rose-200';
    case 'AC Sleeper':
      return 'bg-indigo-50 text-indigo-800 border-indigo-200';
    case 'Deluxe':
      return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'Express':
      return 'bg-sky-50 text-sky-900 border-sky-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  fromId,
  toId,
  dateIso,
  todayIso,
  busFilter,
  buses,
  onBack,
  onSwap,
  onChangeDate,
  onChangeBusFilter,
  onOpenTimetable,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('departure');

  const fromCity = getCityById(fromId);
  const toCity = getCityById(toId);
  const dateParts = formatIsoDateParts(dateIso);

  const filteredAndSorted = useMemo(() => {
    const filtered =
      busFilter === 'All'
        ? buses
        : buses.filter((b) => b.filterKey === busFilter);

    return [...filtered].sort((a, b) => {
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      return a.departureMins - b.departureMins;
    });
  }, [buses, busFilter, sortBy]);

  const canGoPrevDay = dateIso > todayIso;

  return (
    <section className="pb-24">
      {/* Route Summary Top Strip */}
      <div className="bg-white border-b border-[#EAECEF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to bus search"
                className="min-h-[42px] min-w-[42px] -ml-1.5 rounded-xl bg-[#F5F7FA] hover:bg-[#FDF2F6] text-slate-700 hover:text-[#D81B60] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                    {fromCity.name}
                  </h1>
                  <button
                    type="button"
                    onClick={onSwap}
                    aria-label="Reverse route"
                    title="Reverse route"
                    className="w-7 h-7 rounded-full bg-[#FDF2F6] text-[#D81B60] hover:bg-[#D81B60] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </button>
                  <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                    {toCity.name}
                  </h1>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                  {filteredAndSorted.length} buses scheduled
                  <span aria-hidden="true"> · </span>
                  {buses[0]?.distanceKm ?? 180} km corridor
                </p>
              </div>
            </div>

            {/* Date Shifter */}
            <div className="flex items-center justify-between sm:justify-end gap-1.5 bg-[#F5F7FA] p-1 rounded-xl border border-[#EAECEF] shrink-0">
              <button
                type="button"
                disabled={!canGoPrevDay}
                onClick={() => onChangeDate(shiftIsoDate(dateIso, -1))}
                aria-label="Previous day"
                className={`min-h-[38px] min-w-[38px] rounded-lg flex items-center justify-center transition-colors ${
                  canGoPrevDay
                    ? 'hover:bg-white text-slate-700 cursor-pointer'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 text-xs sm:text-sm font-bold text-slate-900 tabular-nums whitespace-nowrap">
                {dateParts.fullLabel}
              </span>
              <button
                type="button"
                onClick={() => onChangeDate(shiftIsoDate(dateIso, 1))}
                aria-label="Next day"
                className="min-h-[38px] min-w-[38px] rounded-lg hover:bg-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter & Sort Controls Row */}
          <div className="mt-4 pt-3.5 border-t border-[#EAECEF] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div
              role="group"
              aria-label="Filter results by bus type"
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
            >
              {FILTER_OPTIONS.map((opt) => {
                const active = busFilter === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChangeBusFilter(opt)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#D81B60] text-white shadow-xs'
                        : 'bg-[#F5F7FA] text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                Sort:
              </span>
              <div className="flex items-center bg-[#F5F7FA] p-0.5 rounded-xl border border-[#EAECEF]">
                {(
                  [
                    { id: 'departure', label: 'Departure' },
                    { id: 'duration', label: 'Fastest' },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSortBy(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      sortBy === s.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-5 space-y-4">
        {filteredAndSorted.length === 0 ? (
          <div className="rsrtc-card p-8 sm:p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F6] text-[#D81B60] mx-auto flex items-center justify-center mb-3">
              <Bus className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              No {busFilter} buses scheduled on this corridor
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Switch back to All bus classes to view Express, Deluxe, and Volvo services operating between {fromCity.name} and {toCity.name}.
            </p>
            <button
              type="button"
              onClick={() => onChangeBusFilter('All')}
              className="mt-4 min-h-[42px] px-5 py-2 rounded-xl rsrtc-gradient text-white text-sm font-semibold cursor-pointer"
            >
              Show All Buses
            </button>
          </div>
        ) : (
          filteredAndSorted.map((bus) => {
            return (
              <article
                key={bus.id}
                className="rsrtc-card p-4 sm:p-6 hover:border-[#D81B60]/35 transition-all"
              >
                {/* Top Row: Category Badge + Depot/Registration + Distance/On-Time */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getCategoryStyle(
                          bus.category
                        )}`}
                      >
                        {bus.category}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500 tabular-nums">
                        {bus.serviceCode}
                      </span>
                      <span aria-hidden="true" className="text-slate-300 hidden sm:inline">
                        ·
                      </span>
                      <span className="text-xs text-slate-600 font-medium truncate hidden sm:inline">
                        {bus.depotName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 sm:hidden">{bus.depotName}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-slate-700 tabular-nums">
                      {bus.distanceKm} km
                    </span>
                    <span aria-hidden="true" className="text-slate-300 mx-1.5">
                      ·
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                      {bus.onTimePercent}% on-time
                    </span>
                  </div>
                </div>

                {/* Middle Row: Departure -> Duration -> Arrival Timeline */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 flex items-center gap-3 sm:gap-5">
                    {/* Departure */}
                    <div className="shrink-0">
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums leading-none">
                        {bus.departureTime}
                      </p>
                      <p className="text-xs font-semibold text-slate-700 mt-1.5">
                        {bus.fromCity.name}
                      </p>
                    </div>

                    {/* Visual Duration Line */}
                    <div className="flex-1 flex flex-col items-center px-1 min-w-[90px]">
                      <span className="text-xs font-semibold text-slate-500 tabular-nums inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {bus.durationLabel}
                      </span>
                      <div className="w-full flex items-center gap-1.5 my-1.5">
                        <span className="w-2 h-2 rounded-full border-2 border-[#D81B60] bg-white shrink-0" />
                        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#D81B60]/50 via-slate-300 to-slate-400" />
                        <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                      </div>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        {bus.fromCity.code} → {bus.toCity.code}
                      </span>
                    </div>

                    {/* Arrival */}
                    <div className="shrink-0 text-right">
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums leading-none">
                        {bus.arrivalTime}
                        {bus.departureMins + bus.durationMinutes >= 1440 && (
                          <span className="text-[11px] font-bold text-[#C2185B] ml-1">
                            (+1)
                          </span>
                        )}
                      </p>
                      <p className="text-xs font-semibold text-slate-700 mt-1.5">
                        {bus.toCity.name}
                      </p>
                    </div>
                  </div>

                  {/* Boarding & Dropping Points */}
                  <div className="md:col-span-4 md:border-l md:border-[#EAECEF] md:pl-5 space-y-1.5 text-xs">
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#D81B60] shrink-0 mt-0.5" />
                      <span className="truncate">
                        <strong className="font-semibold text-slate-800">Board:</strong>{' '}
                        {bus.boardingPoint}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate">
                        <strong className="font-semibold text-slate-800">Drop:</strong>{' '}
                        {bus.droppingPoint}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Service Features (Left) + View Timetable CTA (Right) */}
                <div className="mt-4 pt-4 border-t border-[#EAECEF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0 text-xs">
                    <p className="font-semibold text-slate-700 truncate">
                      {bus.amenities
                        .filter((item) => !/fare|₹|^via\b/i.test(item))
                        .slice(0, 2)
                        .join(' • ')}
                    </p>
                  </div>

                  <div className="flex items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenTimetable(bus)}
                      className="w-full sm:w-auto min-h-[42px] px-5 py-2 rounded-xl rsrtc-gradient text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 shadow-[0_6px_16px_rgba(216,27,96,0.25)] hover:shadow-[0_8px_20px_rgba(216,27,96,0.35)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <ListOrdered className="w-4 h-4" />
                      <span>View Timetable</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
