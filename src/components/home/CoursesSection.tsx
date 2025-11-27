import { useState, useEffect, useRef, useMemo } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { motion, useScroll, useTransform } from "framer-motion";

type Course = {
  country: string;
  tag: string;
  description: string[];
  image: string;
  url: string;
};

const courseCategories: Course[] = [
  {
    country: "UNITED KINGDOM",
    tag: "Study in",
    description: [
      "Home to Top World-Ranking Universities",
      "Wide Range of Scholarships & Financial Assistance",
    ],
    image: "/assets/images/badges/uk.webp",
    url: "https://vsourcevarsity.com/",
  },
  {
    country: "USA",
    tag: "Study in",
    description: [
      "#1 Destination for Top-Ranked Institutions",
      "Extensive Scholarships & Financial Support",
    ],
    image: "/assets/images/badges/usa.webp",
    url: "https://vsourcevarsity.com/",
  },
  {
    country: "CANADA",
    tag: "Study in",
    description: [
      "World-Class Education with Affordable Tuition",
      "Work Opportunities & Post-Study Work Permits",
      "Scholarships and Financial Aid for International Students",
    ],
    image: "/assets/images/badges/canada.webp",
    url: "https://vsourcevarsity.com/",
  },
  {
    country: "IRELAND",
    tag: "Study in",
    description: [
      "Globally Recognized Universities & Research Excellence",
      "Gateway to Europe with Post-Study Work Options",
      "Scholarships & Financial Support Available",
    ],
    image: "/assets/images/badges/ireland.webp",
    url: "https://vsourcevarsity.com/",
  },
  {
    country: "FRANCE",
    tag: "Study in",
    description: [
      "Prestigious Universities",
      "Affordable Education with Rich Cultural Experience",
      "Scholarships & Financial Assistance for International Students",
    ],
    image: "/assets/images/badges/france.webp",
    url: "https://vsourcevarsity.com/",
  },
];

export default function CoursesSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  const computeVisible = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  };
  const [visible, setVisible] = useState<number>(computeVisible());
  useEffect(() => {
    const onResize = () => setVisible(computeVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slides = useMemo(() => {
    const head = courseCategories.slice(0, visible);
    const tail = courseCategories.slice(-visible);
    return [...tail, ...courseCategories, ...head];
  }, [visible]);

  const N = courseCategories.length;
  const [index, setIndex] = useState<number>(visible);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    setIsAnimating(false);
    setIndex(visible);
    const id = requestAnimationFrame(() => setIsAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (!isHoveringRef.current) setIndex((i) => i + 1);
    }, 3500);
  };
  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const handleTransitionEnd = () => {
    if (index >= visible + N) {
      setIsAnimating(false);
      setIndex(visible);
    } else if (index < visible) {
      setIsAnimating(false);
      setIndex(visible + N - 1);
    }
  };
  useEffect(() => {
    if (!isAnimating) {
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isAnimating]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);
  const shortLabel = (country: string) =>
    country === "UNITED KINGDOM" ? "UK" : country;

  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    isHoveringRef.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const dx = e.touches[0].clientX - touchStartXRef.current;
    touchDeltaXRef.current = dx;
    if (Math.abs(dx) > 10) e.preventDefault();
  };
  const onTouchEnd = () => {
    const dx = touchDeltaXRef.current;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    isHoveringRef.current = false;
  };

  const Card = ({ c }: { c: Course }) => {
    const bg = encodeURI(c.image);
    return (
      <div className="px-3 box-border h-full py-6">
        <div className="relative rounded-[15px] overflow-hidden shadow-[0_10px_24px_rgba(16,24,40,0.10)] border border-gray-200 bg-white">
          {/* image */}
          <div className="relative aspect-square">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${bg}')` }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.9) 82%, #ffffff 100%)",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 grid grid-cols-12 pt-6 pr-4 pb-4 pl-4 md:pt-10 md:pr-5 md:pb-5 md:pl-5 lg:pt-12 lg:pr-6 lg:pb-6 lg:pl-6 overflow-hidden">
              <div className="col-span-6 md:col-span-5" aria-hidden />
              <div className="col-span-6 md:col-span-7 flex flex-col md:mt-0 md:pl-3 lg:pl-4 md:pt-10 sm:pt-0 sm:mt-0 overflow-hidden mt-6">
                <div className="text-[#2563EB] text-xs md:text-sm font-semibold uppercase tracking-wide">
                  {c.tag}
                </div>
                <div className="mt-1 text-[20px] leading-tight md:text-3xl lg:text-4xl font-extrabold text-[#E3000F] uppercase">
                  {c.country}
                </div>
                <div className="mt-2 md:mt-3 text-[#0F172A] font-semibold">
                  Why Study in {shortLabel(c.country)}
                </div>
                <ul className="mt-2 space-y-1.5 md:space-y-2 max-h-28 sm:max-h-none overflow-hidden sm:overflow-visible">
                  {c.description.map((line, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-[13px] md:text-[15px] lg:text-base text-[#334155] ${
                        i > 1 ? "hidden sm:flex" : ""
                      } sm:text-left`}
                    >
                      <span className="mt-[7px] inline-block h-2 w-2 rounded-full bg-[#2563EB]" />
                      <span className="leading-snug">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-5 lg:px-6 pb-4">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#e40000] px-4 py-3 text-white text-sm font-semibold hover:bg-[#9c0201] transition"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    );
  };

  /* ---- layout math ---- */
  const slideBasis = `${100 / visible}%`;
  const translatePercent = (100 / visible) * index;

  return (
    <section className="py-8 bg-white">
      <motion.div
        ref={ref}
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="mx-auto sm:px-10 px-5"
      >
        <SectionTitle
          title="🎓 Know about popular study destinations!"
          subtitle="Discover globally ranked universities and career-ready opportunities across the world."
        />

        <AnimateOnScroll>
          <div
            className="relative mt-6"
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
          >
            <div
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                onTransitionEnd={handleTransitionEnd}
                className="flex items-stretch will-change-transform"
                style={{
                  transform: `translateX(-${translatePercent}%)`,
                  transition: isAnimating ? "transform 600ms ease" : "none",
                  width: "100%",
                }}
              >
                {slides.map((course, i) => (
                  <div
                    key={`${course.country}-${i}`}
                    className="shrink-0"
                    style={{ flexBasis: slideBasis }}
                  >
                    <Card c={course} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="flex sm:hidden absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="flex sm:hidden absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              ›
            </button>

            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="hidden sm:flex absolute right-[0%] top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition z-10"
            >
              ›
            </button>
          </div>
        </AnimateOnScroll>
      </motion.div>
    </section>
  );
}
