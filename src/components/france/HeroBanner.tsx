// src/components/university/HeroBanner.tsx
import { Banner } from "@/types/StudyInPage";
import React, { memo } from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  banner: Banner;
};

function HeroBanner({ title, banner }: Props) {
  return (
    <section
      className="
        relative w-full
        min-h-[320px] sm:min-h-[380px]
        h-[55vh] md:h-[75vh]
        overflow-x-clip overflow-y-hidden
      "
      aria-label={title || "Study in France"}
    >
      {/* Responsive image instead of CSS background */}
      <img
        src={`https://backend.vsourceoverseas.com${banner?.url}`}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 w-full h-full
          object-cover
          [object-position:var(--mob-pos)]
          md:[object-position:var(--desk-pos)]
          select-none pointer-events-none
        "
        style={
          {
            // Tailwind can't read dynamic object-position values, so we pass CSS vars
            // Mobile position first, overridden on md+ via the utility above
            ["--mob-pos" as any]: "center 25%",
            ["--desk-pos" as any]: "center",
          } as React.CSSProperties
        }
      />

      {/* Dark overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-tight">
          {title || "Study in France"}
        </h1>

        <div className="mt-6">
          <Link
            to="/contact"
            className="inline-block rounded-md bg-[#F59E0B] px-6 py-3 text-white font-medium text-base md:text-lg shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition"
          >
            Start your France Journey →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroBanner);
