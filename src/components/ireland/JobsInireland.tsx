import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import "../JobsIn.css";
import { Students_expriences } from "@/types/StudyInPage";
/* ---- small hook for scroll-in animation ---- */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const ACCENT = "#e40000";

/* ---- tiny inline icons ---- */
const BriefcaseIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
    <path strokeWidth="2" d="M9 9V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
  </svg>
);
const GearIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path strokeWidth="2" d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
  </svg>
);
const PaletteIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path
      strokeWidth="2"
      d="M12 3a9 9 0 1 0 0 18h3a3 3 0 0 0 0-6h-1a2 2 0 0 1-2-2V9a6 6 0 0 0-6 6"
    />
    <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
    <circle cx="10" cy="6.5" r="1.2" fill="currentColor" />
    <circle cx="14" cy="6.5" r="1.2" fill="currentColor" />
    <circle cx="16.5" cy="10" r="1.2" fill="currentColor" />
  </svg>
);
const ShieldIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path
      strokeWidth="2"
      d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"
    />
    <path strokeWidth="2" d="M9 12l2 2 4-4" />
  </svg>
);
const CloudIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path
      strokeWidth="2"
      d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11-1A4 4 0 0 0 7 18z"
    />
  </svg>
);
const ChartIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <rect x="3" y="10" width="4" height="10" rx="1" strokeWidth="2" />
    <rect x="10" y="6" width="4" height="14" rx="1" strokeWidth="2" />
    <rect x="17" y="3" width="4" height="17" rx="1" strokeWidth="2" />
  </svg>
);
const CameraIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <rect x="3" y="6" width="18" height="14" rx="2" strokeWidth="2" />
    <circle cx="12" cy="13" r="4" strokeWidth="2" />
    <path strokeWidth="2" d="M9 6l2-2h2l2 2" />
  </svg>
);
const StethoscopeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" d="M6 3v6a4 4 0 0 0 8 0V3" />
    <path strokeWidth="2" d="M10 17a4 4 0 0 0 8 0v-3" />
    <circle cx="18" cy="14" r="2" strokeWidth="2" />
  </svg>
);

/* ---- data (aligned to your Ireland content) ---- */
type Column = {
  key: string;
  title: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  points: string[]; // bullet points strictly from your content
};

const BASE_COLUMNS: Column[] = [
  {
    key: "technology",
    title: "Technology",
    color: "#2563EB",
    icon: CloudIcon,
    points: [
      "Key sector in Ireland’s diverse, modern economy",
      "European HQs of many IT companies (e.g., Google, Microsoft, Apple, LinkedIn, Facebook, HP, IBM)",
    ],
  },
  {
    key: "pharma",
    title: "Pharmaceuticals",
    color: "#0EA5E9",
    icon: StethoscopeIcon,
    points: [
      "Key sector in Ireland’s economy",
      "European HQs of many Pharmaceutical companies",
    ],
  },
  {
    key: "finance",
    title: "Finance",
    color: "#22A065",
    icon: ChartIcon,
    points: [
      "Finance is a major sector in Ireland",
      "Opportunities across banking & financial services",
    ],
  },
  {
    key: "agriculture",
    title: "Agriculture",
    color: "#E38B00",
    icon: GearIcon,
    points: [
      "Agriculture is one of Ireland’s key sectors",
      "Part of a diverse and modern economy",
    ],
  },
  {
    key: "tourism",
    title: "Tourism",
    color: "#8B5CF6",
    icon: CameraIcon,
    points: [
      "Tourism is a key contributor to the economy",
      "Vibrant culture and rich heritage attract visitors",
    ],
  },
  {
    key: "education_research",
    title: "Education & Research",
    color: "#C61E5E",
    icon: PaletteIcon,
    points: [
      "Irish research ranks within the top 1% globally in 18 fields",
      "All universities are in the top 3% worldwide",
    ],
  },
  {
    key: "entrepreneurship",
    title: "Entrepreneurship",
    color: "#111827",
    icon: BriefcaseIcon,
    points: [
      "Ireland encourages entrepreneurial effort with innovative programs",
      "Start-up Entrepreneur Programme provides a pathway to found a business",
    ],
  },
];

/* ---- utilities ---- */
function useSlidesPerView() {
  const [spv, setSpv] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setSpv(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return spv;
}

type Prop = {
  students_expriences: Students_expriences;
};

function CareersInIrelandFlow({ students_expriences }: Prop) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const slidesPerView = useSlidesPerView();

  // Build clones for infinite loop
  const slides = useMemo(() => {
    const head = BASE_COLUMNS.slice(-slidesPerView);
    const tail = BASE_COLUMNS.slice(0, slidesPerView);
    return [...head, ...BASE_COLUMNS, ...tail];
  }, [slidesPerView]);

  const [index, setIndex] = useState(slidesPerView);
  const [isAnimating, setAnimating] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  // Normalize index to active (without clones)
  const active =
    (index - slidesPerView + BASE_COLUMNS.length) % BASE_COLUMNS.length;

  useEffect(() => {
    setIndex(slidesPerView); // reset when spv changes
  }, [slidesPerView]);

  // Looping logic after transition
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onEnd = () => {
      if (index >= BASE_COLUMNS.length + slidesPerView) {
        setAnimating(false);
        setIndex(slidesPerView);
      }
      if (index <= slidesPerView - 1) {
        setAnimating(false);
        setIndex(BASE_COLUMNS.length + slidesPerView - 1);
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [index, slidesPerView]);

  useEffect(() => {
    if (!isAnimating) {
      // turn animation back on after the instant jump
      const id = requestAnimationFrame(() => setAnimating(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isAnimating]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [paused]);

  const translatePct = -(index * (100 / slidesPerView));

  return (
    <section className="py-12 md:py-16 bg-white">
      <div
        ref={ref}
        className="mx-auto max-w-6xl px-4 md:px-6"
        style={{
          transform: inView ? "translateY(0)" : "translateY(12px)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms",
        }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-black">
          Careers in Ireland
        </h2>

        {/* Chips to jump to a category */}
        <div className="mt-6">
          <div className="flex gap-2 overflow-x-auto justify-center md:justify-center">
            {BASE_COLUMNS.map((c, i) => {
              const isActive = active === i;
              return (
                <button
                  key={c.key}
                  onClick={() => setIndex(slidesPerView + i)}
                  className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold border transition"
                  style={{
                    color: isActive ? "white" : "#111",
                    backgroundColor: isActive ? c.color : "transparent",
                    borderColor: isActive ? c.color : "rgba(0,0,0,0.15)",
                  }}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* controls */}
          <button
            aria-label="Previous"
            onClick={() => setIndex((i) => i - 1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 items-center justify-center bg-white/90 border shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => setIndex((i) => i + 1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 items-center justify-center bg-white/90 border shadow hover:bg-white"
          >
            ›
          </button>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{
                width: "100%",
                transform: `translateX(${translatePct}%)`,
                transition: isAnimating
                  ? "transform 650ms cubic-bezier(0.22,1,0.36,1)"
                  : "none",
              }}
            >
              {slides.map((col, i) => (
                <div
                  key={`${col.key}-${i}`}
                  style={{
                    flex: `0 0 ${100 / slidesPerView}%`,
                    padding: "0 12px",
                  }}
                >
                  <FlowColumn col={col} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student/community strip */}
        <div className="mt-12 text-center">
          <div
            className="text-lg md:text-xl font-extrabold"
            style={{ color: ACCENT }}
          >
            KNOW THEIR EXPERIENCES
          </div>
          <div className="mt-1 text-xs md:text-sm text-neutral-700">
            OUR ALUMNI FROM 10+ COUNTRIES
          </div>

          {/* Desktop / Tablet normal layout */}
          <div className="grid-layout hidden sm:flex justify-center gap-4 mt-8">
            {(
              students_expriences?.images?.length && students_expriences?.images
            )?.map((src, idx) => (
              <img
                key={src?.id || idx}
                src={`https://backend.vsourceoverseas.com${src?.url}`}
                alt="Alumni"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
              />
            ))}
          </div>

          {/* Mobile circle layout */}
          <div className="circle-wrapper sm:hidden relative w-full max-w-sm mx-auto mt-8">
            {(
              students_expriences?.images?.length && students_expriences?.images
            )?.map((src, idx) => (
              <img
                key={src?.id || idx}
                src={`https://backend.vsourceoverseas.com${src?.url}`}
                alt="Alumni"
                className={`circle-img circle-${idx + 1}`}
              />
            ))}
          </div>

          {/* <div className="mt-4 text-xs md:text-sm text-neutral-700 ">
            Work rights: <b>20 hrs/week</b> during semester · <b>40 hrs/week</b> during vacations. Stay-back via the <b>Third Level Graduate Programme</b>.
          </div> */}
        </div>
      </div>
    </section>
  );
}

/* ---- a single category card ---- */
function FlowColumn({ col }: { col: Column }) {
  return (
    <div className="relative w-full max-w-[360px] mx-auto flex flex-col items-center">
      {/* Top colored header */}
      <div
        className="w-full rounded-[8px] text-white shadow-sm relative"
        style={{ backgroundColor: col.color }}
      >
        <div className="flex items-center justify-center gap-2 px-5 pt-4">
          <col.icon width={18} height={18} />
          <span className="font-semibold text-base md:text-lg text-center">
            {col.title}
          </span>
        </div>

        <div
          className="mx-5 my-3 h-px opacity-30"
          style={{ backgroundColor: "#fff" }}
        />

        {/* connector */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-8"
          style={{
            width: "2px",
            backgroundColor: col.color,
            borderRadius: "9999px",
          }}
          aria-hidden
        />
      </div>

      {/* Column line behind */}
      <div className="relative w-full">
        <span
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0"
          style={{
            width: "2px",
            backgroundColor: col.color,
            borderRadius: "9999px",
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full space-y-2 pt-5">
          {col.points.map((pt) => (
            <div
              key={pt}
              className="mx-auto w-[88%] rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-xs md:text-sm text-black shadow-sm"
            >
              {pt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
declare module "react" {
  interface CSSProperties {
    /** Firefox-only: 'auto' | 'thin' | 'none' */
    scrollbarWidth?: string;
  }
}

export default memo(CareersInIrelandFlow);
