import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BusService, formatIsoDateParts } from '../data/rsrtcData';

interface TimetableBookingModalProps {
  bus: BusService | null;
  dateIso: string;
  onClose: () => void;
}

export const TimetableBookingModal: React.FC<TimetableBookingModalProps> = ({
  bus,
  dateIso,
  onClose,
}) => {
  useEffect(() => {
    if (!bus) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [bus, onClose]);

  if (!bus) return null;

  const dateParts = formatIsoDateParts(dateIso);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${bus.fromCity.name} to ${bus.toCity.name} bus timetable`}
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
      />

      <div className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="rsrtc-gradient text-white px-5 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <p className="text-xs text-white/80 font-medium truncate">
              {bus.category} · {bus.busNumber} · {dateParts.fullLabel}
            </p>
            <h2 className="text-base sm:text-lg font-extrabold truncate mt-0.5">
              {bus.fromCity.name} → {bus.toCity.name}{' '}
              <span className="font-mono font-semibold text-sm text-white/90 ml-1">
                ({bus.departureTime} – {bus.arrivalTime})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close timetable"
            className="min-h-[40px] min-w-[40px] rounded-xl hover:bg-white/15 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route Timetable Body */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAECEF] text-xs text-slate-500">
            <span>
              Operated by <strong className="text-slate-800">{bus.depotName}</strong>
            </span>
            <span className="tabular-nums">
              {bus.stops.length} Stops ·{' '}
              <strong className="text-slate-800">{bus.distanceKm} km</strong> ·{' '}
              {bus.durationLabel}
            </span>
          </div>

          <ol className="relative space-y-0">
            {bus.stops.map((stop, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === bus.stops.length - 1;
              return (
                <li key={`${stop.stopName}-${idx}`} className="flex gap-4 pb-5 last:pb-0">
                  {/* Time column */}
                  <div className="w-16 shrink-0 text-right pt-0.5">
                    <span className="block text-sm font-extrabold text-slate-900 tabular-nums">
                      {isFirst ? stop.departureTime : stop.arrivalTime}
                    </span>
                    <span className="block text-[11px] text-slate-400 tabular-nums">
                      {stop.distanceKm} km
                    </span>
                  </div>

                  {/* Vertical Timeline Dot & Line */}
                  <div className="relative flex flex-col items-center">
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 z-10 mt-1 ${
                        isFirst || isLast
                          ? 'bg-[#D81B60] border-[#D81B60]'
                          : 'bg-white border-[#D81B60]'
                      }`}
                    />
                    {!isLast && <span className="w-0.5 flex-1 bg-slate-200 my-1" />}
                  </div>

                  {/* Stop Details */}
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{stop.stopName}</h4>
                      {stop.platform && (
                        <span className="text-xs font-semibold text-[#C2185B] shrink-0">
                          {stop.platform}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{stop.stand}</p>
                    <div className="text-[11px] text-slate-500 mt-1 tabular-nums flex items-center gap-2">
                      {isFirst ? (
                        <span>
                          Boarding opens {stop.arrivalTime} · Departs {stop.departureTime}
                        </span>
                      ) : isLast ? (
                        <span>Scheduled Arrival {stop.arrivalTime}</span>
                      ) : (
                        <span>
                          Arr {stop.arrivalTime} · Dep {stop.departureTime} ({stop.haltMins}m halt)
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 pt-4 border-t border-[#EAECEF] flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-500">
              {bus.amenities.slice(0, 2).join(' • ')}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-6 rounded-xl rsrtc-gradient text-white font-bold text-sm cursor-pointer whitespace-nowrap"
            >
              Close Timetable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
