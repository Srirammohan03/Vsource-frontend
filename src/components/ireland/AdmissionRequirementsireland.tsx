import { Admissions } from "@/types/StudyInPage";
import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DelayedPopup from "../DelayedPopup";

/* tiny hook for a subtle scroll-in animation */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const ACCENT = "#e40000";

type Prop = {
  admissions: Admissions;
};

function AdmissionRequirementsireland({ admissions }: Prop) {
  const [showPopup, setShowPopup] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section
      className="py-12 md:py-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(246,247,249,0.9) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div
        ref={ref}
        className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
        style={{
          transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms",
        }}
      >
        {/* LEFT: Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-black">
            {admissions?.title || <>Ireland Admissions — What You Need</>}
          </h2>

          <p className="mt-4 text-base md:text-lg font-semibold text-black">
            {admissions?.subheading1 || "Why Study in Ireland?"}
          </p>

          <p
            className="mt-1 text-sm md:text-base font-semibold"
            style={{ color: ACCENT }}
          >
            {admissions?.subheading2 ||
              "World-Class Universities | 1-Year Master’s | Stamp 2 Work Rights"}
          </p>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-neutral-800">
            {admissions?.description ||
              "Ireland offers globally respected universities, research-driven programs, and welcoming campuses in an English-speaking country. With industry links to leading tech and pharma firms, clear post-study stay-back options, and a safe, vibrant culture, it’s a fantastic destination for international students."}
          </p>

          <div className="mt-7">
            <button
              onClick={() => setShowPopup(true)}
              className="inline-flex items-center justify-center rounded-[5px] px-6 py-3 text-white font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: ACCENT }}
            >
              Talk to our Expert
            </button>
          </div>
        </div>

        {/* RIGHT: Requirements card */}
        <div className="w-full">
          <div className="rounded-2xl bg-white shadow-[0_10px_24px_rgba(16,24,40,0.08)] ring-1 ring-gray-200/70 p-6 md:p-7">
            <h3 className="text-lg md:text-xl font-bold text-black">
              Application Checklist
            </h3>

            <ul className="mt-4 space-y-3">
              {admissions &&
                admissions?.checklist &&
                admissions?.checklist?.texts &&
                admissions?.checklist?.texts.map((item, idx) => (
                  <li
                    key={item?.id || idx}
                    className="flex items-start gap-3 rounded-lg border border-gray-200/70 bg-gray-50 px-3.5 py-3"
                  >
                    <CheckIcon />
                    <span className="text-sm md:text-base text-neutral-900">
                      {item?.lists || "text not loaded properly"}
                    </span>
                  </li>
                ))}
            </ul>

            {/* subtle note */}
            <p className="mt-4 text-xs md:text-sm text-neutral-600">
              {admissions?.checklist?.note ||
                "* Requirements vary by university and program. For SDS (Student Direct Stream), typical expectations include IELTS 6.0 in each band, 1-year tuition payment receipt, and a CAD $10,000 GIC. We’ll guide you on exact documents, score targets, and timelines."}
            </p>
          </div>
        </div>
      </div>
      {showPopup && (
        <DelayedPopup
          onMinimize={() => {
            setShowPopup(false);
          }}
        />
      )}
    </section>
  );
}

/* simple accent check icon */
function CheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full"
      style={{ backgroundColor: "rgba(228,0,0,0.1)", color: ACCENT }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export default memo(AdmissionRequirementsireland);
