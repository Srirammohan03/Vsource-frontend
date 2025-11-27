import { Living_Cost_Tuition_Fee } from "@/types/StudyInPage";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

/* ---------- small hook to animate on scroll ---------- */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { root: null, threshold: 0.2, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ---------- component ---------- */
type Prop = {
  living_Cost_Tuition_Fee: Living_Cost_Tuition_Fee;
};

const ACCENT = "#e40000";

function CityCostsTabs({ living_Cost_Tuition_Fee }: Prop) {
  const [active, setActive] = useState<number>(
    living_Cost_Tuition_Fee?.cities[0]?.id || 0
  );
  const { ref, inView } = useInView<HTMLDivElement>();

  const activeCity = useMemo(
    () => living_Cost_Tuition_Fee?.cities.find((city) => city.id === active),
    [active, living_Cost_Tuition_Fee]
  );

  if (!living_Cost_Tuition_Fee || !living_Cost_Tuition_Fee.cities.length) {
    return null; // Or a loading/placeholder state
  }

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          {living_Cost_Tuition_Fee?.title ||
            "Ireland: Living Costs & Tuition Fees"}
        </h2>
      </div>

      {/* Tabs (centered) */}
      <div className="mt-6">
        <div className="w-fit mx-auto border-b">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-center">
            {living_Cost_Tuition_Fee.cities.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="relative pb-2 text-sm md:text-base font-semibold transition-colors"
                  style={{ color: isActive ? ACCENT : "#444" }}
                >
                  {t.city}
                  <span
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full"
                    style={{
                      backgroundColor: isActive ? ACCENT : "transparent",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeCity && (
        <div
          ref={ref}
          className="mt-8 max-w-3xl mx-auto"
          style={{
            transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
            opacity: inView ? 1 : 0,
            transition:
              "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms",
          }}
        >
          {/* City title */}
          <h3 className="text-xl md:text-2xl font-bold text-black text-center">
            {activeCity.city}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm md:text-base text-neutral-700 text-center">
            {activeCity.description}
          </p>

          {/* Image */}
          {activeCity.image && (
            <div className="mt-6 rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200/70">
              <img
                src={`https://backend.vsourceoverseas.com${activeCity.image.url}`}
                alt={activeCity.city}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Tables */}
          {activeCity.tables.map((table) => (
            <SectionBlock title={table.title} key={table.id}>
              {table.label_values.length ? (
                <CardTable rows={table.label_values} />
              ) : (
                <Placeholder />
              )}
            </SectionBlock>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- subcomponents ---------- */
type TableRow = { label: string; value: string };

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <h4 className="text-lg md:text-xl font-bold text-black text-center">
        {title}
      </h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * CardTable: consistent, centered, “3D” look with light grey borders.
 * - columns are 50/50 so the vertical divider sits dead-center under the heading
 * - all cell edges have borders (no missing bottom/outer lines)
 */
function CardTable({ rows }: { rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="rounded-xl shadow-[0_10px_24px_rgba(16,24,40,0.08)] ring-1 ring-gray-200/80">
        <table className="w-full table-fixed border-collapse">
          {/* Center the vertical divider: 50% / 50% */}
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>

          <thead>
            <tr>
              <th
                className="px-5 py-3 text-left text-black font-semibold border border-gray-200"
                style={{ backgroundColor: "#E5EBF0" }} // grey
              >
                Expense
              </th>
              <th
                className="px-5 py-3 text-left text-black font-semibold border border-gray-200"
                style={{ backgroundColor: "#E5EBF0" }} // grey
              >
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="bg-white">
                {/* All cell edges get a border to avoid gaps, including last row */}
                <td className="px-5 py-3 align-top border border-gray-200">
                  {r.label}
                </td>
                <td className="px-5 py-3 align-top border border-gray-200">
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="text-center text-neutral-500 text-sm md:text-base rounded-xl py-6 shadow-[0_6px_16px_rgba(16,24,40,0.06)] ring-1 ring-gray-200/80">
      Add content for this city…
    </div>
  );
}

export default memo(CityCostsTabs);
