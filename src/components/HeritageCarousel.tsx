import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Bus } from 'lucide-react';
import { HERITAGE_BANNERS, BusFilterOption } from '../data/rsrtcData';

interface HeritageCarouselProps {
  onQuickAction: (fromId: string, toId: string, filter: BusFilterOption) => void;
}

export const HeritageCarousel: React.FC<HeritageCarouselProps> = ({ onQuickAction }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERITAGE_BANNERS.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goTo = (index: number) => {
    const normalized = (index + HERITAGE_BANNERS.length) % HERITAGE_BANNERS.length;
    setActiveIndex(normalized);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? activeIndex + 1 : activeIndex - 1);
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      aria-label="RSRTC Heritage and Fleet Highlights"
      className="max-w-5xl mx-auto px-4 sm:px-6 mt-14 sm:mt-16"
    >
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-[#EAECEF] bg-slate-900"
      >
        {/* Sliding Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERITAGE_BANNERS.map((banner) => {
            const imgFailed = failedImages[banner.id];
            return (
              <div
                key={banner.id}
                className="w-full shrink-0 relative h-[220px] sm:h-[270px] lg:h-[300px]"
              >
                {!imgFailed ? (
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [banner.id]: true }))
                    }
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full rsrtc-gradient flex items-center justify-center">
                    <Bus className="w-16 h-16 text-white/25" />
                  </div>
                )}

                {/* Measured Gradient Scrim for WCAG AA Legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/55 to-slate-950/15" />

                {/* Banner Copy & Action */}
                <div className="absolute inset-0 p-5 sm:p-8 lg:p-10 flex flex-col justify-end sm:justify-center max-w-xl">
                  <p className="text-xs font-semibold text-pink-200 tracking-wide">
                    {banner.kicker}
                  </p>
                  <h2 className="text-lg sm:text-2xl lg:text-[28px] font-extrabold text-white mt-1.5 leading-snug [text-wrap:balance]">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/85 mt-2 line-clamp-2 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        onQuickAction(
                          banner.actionFromId,
                          banner.actionToId,
                          banner.actionFilter
                        )
                      }
                      className="min-h-[40px] px-4 py-2 rounded-xl bg-white text-[#B0124D] hover:bg-[#FDF2F6] text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <span>{banner.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Prev / Next Controls */}
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous banner"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/45 hover:bg-slate-950/70 text-white items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next banner"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/45 hover:bg-slate-950/70 text-white items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-3.5 right-4 sm:right-6 flex items-center gap-1.5">
          {HERITAGE_BANNERS.map((banner, idx) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`View slide ${idx + 1}: ${banner.title}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'w-7 bg-[#E91E63]'
                  : 'w-2 bg-white/55 hover:bg-white/85'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
