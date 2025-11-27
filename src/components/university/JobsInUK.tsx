import React, { memo, useEffect, useRef, useState } from "react";
// import "../../App.css";
import "../JobsIn.css";
import { Students_expriences } from "@/types/StudyInPage";

/* small hook for scroll-in animation */
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

/* tiny inline icons */
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

/* data */
type Column = {
  key: string;
  title: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  salary: string;
  jobs: string[];
};

const columns: Column[] = [
  {
    key: "business",
    title: "Business",
    color: "#E38B00",
    icon: BriefcaseIcon,
    salary: "₹ 5,00,000/",
    jobs: [
      "Financial Manager",
      "Sales Representative",
      "Accountant",
      "Business Analyst",
    ],
  },
  {
    key: "engineering",
    title: "Engineering",
    color: "#2563EB",
    icon: GearIcon,
    salary: "₹ 7,00,000/",
    jobs: [
      "Project Manager",
      "Mechanical Engineer",
      "Chemical Engineer",
      "Software Developer",
    ],
  },
  {
    key: "arts",
    title: "Arts & Designing",
    color: "#22A065",
    icon: PaletteIcon,
    salary: "₹ 6,00,000/",
    jobs: [
      "Content Writer",
      "Marketing Manager",
      "Fashion Designer",
      "Journalist",
    ],
  },
];

type Prop = {
  students_expriences: Students_expriences;
};

function JobsInUKFlow({ students_expriences }: Prop) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

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
        <h2
          className="text-center text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: "black" }}
        >
          Jobs in UK
        </h2>

        {/* CENTERED columns */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {columns.map((col, i) => (
            <FlowColumn key={col.key} col={col} index={i} />
          ))}
        </div>

        {/* Alumni strip (kept minimal) */}
        <div className="mt-12 text-center relative">
          {/* Heading */}
          <div className="relative z-10">
            <div
              className="text-lg md:text-xl font-extrabold"
              style={{ color: "#E53935" }}
            >
              {students_expriences?.title || "KNOW THEIR EXPERIENCES"}
            </div>
            <div className="mt-1 text-xs md:text-sm text-neutral-700">
              {students_expriences?.subheading ||
                " OUR ALUMNI FROM 10+ COUNTRIES"}
            </div>
          </div>

          {/* Desktop / Tablet normal layout */}
          <div className="grid-layout hidden sm:flex justify-center gap-4 mt-8">
            {(
              students_expriences?.images?.length && students_expriences.images
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
              students_expriences?.images?.length && students_expriences.images
            )?.map((src, idx) => (
              <img
                key={src?.id || idx}
                src={`https://backend.vsourceoverseas.com${src?.url}`}
                alt="Alumni"
                className={`circle-img circle-${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* column with colored header, connector from header, line behind boxes, white pills */
function FlowColumn({ col, index }: { col: Column; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const delay = 120 * index;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[300px] flex flex-col items-center"
      style={{
        transform: inView ? "translateY(0)" : "translateY(14px)",
        opacity: inView ? 1 : 0,
        transition:
          `transform 620ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, ` +
          `opacity 620ms ${delay}ms`,
      }}
    >
      {/* Top colored header */}
      <div
        className="w-full rounded-[5px] text-white shadow-sm relative"
        style={{ backgroundColor: col.color }}
      >
        {/* centered title + icon */}
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

        {/* white salary badge */}
        <div className="px-5 pb-5 flex justify-center">
          <div className="bg-white text-black rounded-md px-3 py-1.5 text-center shadow-sm">
            <div className="text-[11px] md:text-xs opacity-80">
              Average Salary
            </div>
            <div className="text-sm md:text-base font-extrabold">
              {col.salary}
            </div>
          </div>
        </div>

        {/* connector that comes OUT of the header and meets the column line (taller now) */}
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

      {/* Column line BEHIND boxes (so it won't appear inside them) */}
      <div className="relative w-full">
        {/* full-height line behind */}
        <span
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0"
          style={{
            width: "2px",
            backgroundColor: col.color,
            borderRadius: "9999px",
          }}
          aria-hidden
        />

        {/* smaller white job boxes */}
        <div className="relative z-10 w-full space-y-2 pt-5">
          {col.jobs.map((job) => (
            <div
              key={job}
              className="mx-auto w-[88%] rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-xs md:text-sm text-black shadow-sm"
            >
              {job}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(JobsInUKFlow);
