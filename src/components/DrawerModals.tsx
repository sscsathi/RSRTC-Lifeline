import React, { useState, useEffect } from 'react';
import {
  X,
  PhoneCall,
  Copy,
  Check,
  ShieldAlert,
  Search,
  Building2,
  ClockAlert,
  CheckCircle2,
} from 'lucide-react';
import { ActiveModalType } from './Header';
import {
  BusCategory,
  CITY_HUBS,
  RSRTC_HELPLINES,
  getCityById,
} from '../data/rsrtcData';

interface DrawerModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  onSearchFromDepot: (fromId: string, toId: string) => void;
}

const BUS_CATEGORIES: BusCategory[] = [
  'Ordinary',
  'Express',
  'Super Deluxe',
  'Deluxe',
  'Super Luxury Volvo',
  'AC Sleeper',
];

export const DrawerModals: React.FC<DrawerModalsProps> = ({
  activeModal,
  onClose,
  onSearchFromDepot,
}) => {
  const [copiedNum, setCopiedNum] = useState<string | null>(null);
  const [sosSent, setSosSent] = useState(false);
  const [depotQuery, setDepotQuery] = useState('');

  const [reportFrom, setReportFrom] = useState('deeg');
  const [reportTo, setReportTo] = useState('jaipur-sindhi-camp');
  const [reportTime, setReportTime] = useState('06:30');
  const [reportClass, setReportClass] = useState<BusCategory>('Express');
  const [reportNote, setReportNote] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  useEffect(() => {
    setReportSubmitted(false);
    setSosSent(false);
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  const copyToClipboard = (num: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num).catch(() => {});
    }
    setCopiedNum(num);
    window.setTimeout(() => setCopiedNum(null), 2000);
  };

  const getHeaderMeta = () => {
    switch (activeModal) {
      case 'helpline':
        return { title: '24x7 Helpline & SOS', icon: <PhoneCall className="w-5 h-5" /> };
      case 'depots':
        return { title: 'All 50 Rajasthan Depots', icon: <Building2 className="w-5 h-5" /> };
      case 'report':
        return { title: 'Report / Update Bus Timing', icon: <ClockAlert className="w-5 h-5" /> };
    }
  };

  const meta = getHeaderMeta();

  const filteredDepots = CITY_HUBS.filter(
    (d) =>
      d.name.toLowerCase().includes(depotQuery.trim().toLowerCase()) ||
      d.depot.toLowerCase().includes(depotQuery.trim().toLowerCase()) ||
      d.code.toLowerCase().includes(depotQuery.trim().toLowerCase()) ||
      d.region.toLowerCase().includes(depotQuery.trim().toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={meta.title}
    >
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" />

      <div className="relative z-10 w-full sm:max-w-xl max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="rsrtc-gradient text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            {meta.icon}
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
              {meta.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="min-h-[40px] min-w-[40px] rounded-xl hover:bg-white/15 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* 1. HELPLINE & SOS */}
          {activeModal === 'helpline' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#F8BBD0] bg-[#FDF2F6] p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#B0124D]">
                    24x7 Toll-Free Bus Helpline
                  </p>
                  <p className="text-2xl font-mono font-extrabold text-slate-900 mt-1 tabular-nums">
                    {RSRTC_HELPLINES.tollFree}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Route enquiries, lost luggage &amp; depot control room
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(RSRTC_HELPLINES.tollFree)}
                  className="min-h-[42px] px-3.5 rounded-xl bg-white border border-[#F8BBD0] text-[#C2185B] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedNum === RSRTC_HELPLINES.tollFree ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: 'Central Enquiry Jaipur',
                    num: RSRTC_HELPLINES.centralEnquiryJaipur,
                    note: 'Sindhi Camp Desk',
                  },
                  {
                    label: 'Emergency SOS',
                    num: RSRTC_HELPLINES.emergency,
                    note: 'Police & Safety',
                  },
                  {
                    label: 'Highway Helpline',
                    num: RSRTC_HELPLINES.highwayHelpline,
                    note: 'NHAI 24x7 Assist',
                  },
                ].map((desk) => (
                  <div
                    key={desk.label}
                    className="rounded-2xl border border-[#EAECEF] bg-[#FAFBFD] p-3.5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {desk.label}
                      </p>
                      <p className="text-sm font-mono font-bold text-[#C2185B] mt-0.5 tabular-nums">
                        {desk.num}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{desk.note}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(desk.num)}
                      aria-label={`Copy ${desk.label}`}
                      className="w-9 h-9 rounded-lg bg-white border border-[#EAECEF] flex items-center justify-center text-slate-600 hover:text-[#D81B60] cursor-pointer shrink-0"
                    >
                      {copiedNum === desk.num ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EAECEF]">
                {sosSent ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs leading-relaxed">
                    <strong className="block text-sm font-bold mb-0.5">
                      Control Room Alert Logged
                    </strong>
                    Safety alert recorded. For immediate voice assistance, dial{' '}
                    {RSRTC_HELPLINES.tollFree}, {RSRTC_HELPLINES.emergency}, or Highway Helpline{' '}
                    {RSRTC_HELPLINES.highwayHelpline}.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSosSent(true)}
                    className="w-full min-h-[48px] rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Trigger Passenger Safety SOS Alert</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 2. ALL 50 DISTRICTS / DEPOTS DIRECTORY */}
          {activeModal === 'depots' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={depotQuery}
                  onChange={(e) => setDepotQuery(e.target.value)}
                  placeholder="Filter all 50 Rajasthan districts & depots..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#EAECEF] bg-[#FAFBFD] focus:bg-white focus:outline-none focus:border-[#D81B60]"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="tabular-nums">
                  Showing <strong className="text-slate-800">{filteredDepots.length}</strong> of{' '}
                  {CITY_HUBS.length} districts
                </span>
                <span>Tap any district to view schedules</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredDepots.map((hub) => (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => {
                      const dest =
                        hub.id === 'jaipur-sindhi-camp'
                          ? 'bharatpur'
                          : 'jaipur-sindhi-camp';
                      onClose();
                      onSearchFromDepot(hub.id, dest);
                    }}
                    className="p-3 rounded-xl border border-[#EAECEF] bg-[#FAFBFD] hover:border-[#D81B60]/40 hover:bg-[#FDF2F6]/60 text-left flex items-center justify-between gap-2 transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#C2185B]">
                        {hub.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {hub.depot} · {hub.region} Rajasthan
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400 group-hover:text-[#D81B60] shrink-0">
                      {hub.code}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. REPORT / UPDATE TIMING */}
          {activeModal === 'report' && (
            <div>
              {reportSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Timing Update Submitted
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you for helping keep RSRTC Lifeline accurate. We will review the updated departure time for{' '}
                    <strong className="text-slate-800">
                      {getCityById(reportFrom).name} → {getCityById(reportTo).name}
                    </strong>{' '}
                    ({reportTime}).
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 min-h-[44px] px-6 rounded-xl rsrtc-gradient text-white font-bold text-sm cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReportSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Spotted a revised depot schedule, new bus departure, or stop timing change? Share it below to help fellow Rajasthan passengers.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        From District
                      </label>
                      <select
                        value={reportFrom}
                        onChange={(e) => setReportFrom(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#EAECEF] bg-[#FAFBFD] font-semibold text-slate-900 focus:outline-none focus:border-[#D81B60]"
                      >
                        {CITY_HUBS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        To District
                      </label>
                      <select
                        value={reportTo}
                        onChange={(e) => setReportTo(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#EAECEF] bg-[#FAFBFD] font-semibold text-slate-900 focus:outline-none focus:border-[#D81B60]"
                      >
                        {CITY_HUBS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Updated Departure Time
                      </label>
                      <input
                        type="time"
                        required
                        value={reportTime}
                        onChange={(e) => setReportTime(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#EAECEF] bg-[#FAFBFD] font-mono font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#D81B60]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Bus Category
                      </label>
                      <select
                        value={reportClass}
                        onChange={(e) => setReportClass(e.target.value as BusCategory)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#EAECEF] bg-[#FAFBFD] font-semibold text-slate-900 focus:outline-none focus:border-[#D81B60]"
                      >
                        {BUS_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Details / Depot Note
                    </label>
                    <textarea
                      rows={3}
                      value={reportNote}
                      onChange={(e) => setReportNote(e.target.value)}
                      placeholder="e.g., Deeg morning express now departs Platform 2 at 06:30 AM..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EAECEF] bg-[#FAFBFD] focus:bg-white focus:outline-none focus:border-[#D81B60] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[46px] rounded-xl rsrtc-gradient text-white font-bold text-sm cursor-pointer"
                  >
                    Submit Timing Update
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
