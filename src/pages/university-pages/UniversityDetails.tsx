import React, {
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  memo,
} from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TABS, useUniversitiesByDocumentId } from "@/lib/Universities";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  ArrowDown,
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Gift,
  Image,
  LayoutDashboard,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

const UniversityGallery = lazy(() => import("./UniversityGallery"));
const FaqAccordion = lazy(() => import("./FaqAccordion"));
const UniversityPlacement = lazy(() => import("./UniversityPlacement"));
const WantTOStudyForm = lazy(() => import("./WantTOStudyForm"));

import DelayedPopup from "@/components/DelayedPopup";
import RichText from "@/utils/RichText";
import UniversityDetailsSkeleton from "@/Loaders/LandingPages/UniversityDetailsSkeleton";
import UniversityNotFound from "@/Loaders/LandingPages/UniversityNotFound";
import UniversityGallerySkeleton from "./UniversityGallerySkeleton";
import UniversityPlacementSkeleton from "./UniversityPlacementSkeleton";
import FaqAccordionSkeleton from "./FaqAccordionSkeleton";
import WantTOStudyFormSkeleton from "./WantTOStudyFormSkeleton";

const UniversityDetails: React.FC = () => {
  const { documentId } = useParams<{
    documentId: string;
  }>();

  const {
    data: university,
    isError,
    isLoading,
    error,
  } = useUniversitiesByDocumentId(documentId);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedTab, setSelectedTab] = useState<"masters">("masters");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentScholarshipSlide, setCurrentScholarshipSlide] = useState(0);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    overview: useRef<HTMLDivElement>(null),
    rankings: useRef<HTMLDivElement>(null),
    intakes: useRef<HTMLDivElement>(null),
    courses: useRef<HTMLDivElement>(null),
    cost: useRef<HTMLDivElement>(null),
    scholarships: useRef<HTMLDivElement>(null),
    admissions: useRef<HTMLDivElement>(null),
    placements: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setActiveTab(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-100px 0px -40% 0px",
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  if (isError) {
    toast.error("failed to load explore universities");
    console.error("failed to load explore universities", error);
    return null;
  }

  if (isLoading || !university) {
    return <UniversityDetailsSkeleton />;
  }

  // const university = UNIVERSITIES.find((u: University) => u.slug === slug);

  if (!university) {
    return <UniversityNotFound />;
  }

  const courses = university?.courses || [];
  const coursesPerPage = 4;
  const totalSlides = Math.ceil(
    (university?.courses?.famous_courses?.length || 0) / coursesPerPage
  );

  const startIdx = currentSlide * coursesPerPage;
  const visibleCourses = university?.courses?.famous_courses?.slice(
    startIdx,
    startIdx + coursesPerPage
  );

  const paddedCourses = [...(visibleCourses || [])];
  while (paddedCourses.length < coursesPerPage) {
    paddedCourses.push(null);
  }

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const totalScholarships =
    university?.scholarship?.scholarship_details?.length || 0;

  const handleScrollTo = (id: string) => {
    setActiveTab(id);
    const ref = sectionRefs[id];
    if (ref?.current) {
      const yOffset = -170;
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="curved-before overflow-hidden relative w-full text-white before:content-[''] before:absolute before:top-0 before:left-0 before:bg-[#2563eb] before:right-0 before:0 before:w-full before:h-[80%]">
        <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse md:flex-row w-full max-w-[1400px] mx-auto px-4 rounded-mds">
          <div className="w-full md:basis-[40%]  flex flex-col bg-white p-[10px]  shadow">
            <div className="w-full h-full p-3">
              <img
                src={`https://backend.vsourceoverseas.com${university?.logo?.url}`}
                alt={university?.logo?.alternativeText}
                className="w-full h-full object-contain mb-4"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
              />
            </div>

            {/* Details */}
            <div
              className="flex flex-col gap-3 px-[15px] py-[10px]"
              // data-aos="zoom-in-up"
              // data-aos-anchor-placement="top-bottom"
            >
              <h1 className="text-2xl md:text-4xl font-bold text-black">
                {university?.name}
              </h1>
              <p className="text-base md:text-lg text-black">
                {university?.campus} • {university?.country}
              </p>
              <button
                onClick={() => setShowPopup(true)}
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 w-full  text-center"
              >
                Apply with VSource
              </button>
            </div>
            {showPopup && (
              <DelayedPopup
                onMinimize={() => {
                  setShowPopup(false);
                }}
              />
            )}
          </div>
          {/* Right Section (Banner Image) */}
          <div
            className="w-full md:basis-[60%] h-[200px] md:h-auto  overflow-hidden"
            // data-aos="zoom-in-up"
            // data-aos-anchor-placement="top-bottom"
          >
            <img
              src={`https://backend.vsourceoverseas.com${university?.banner?.url}`}
              alt={`${university?.name} banner`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <nav className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-4 text-sm text-gray-600">
        <ol className="flex flex-wrap">
          <li>
            <Link to="/" className="hover:text-red-500 cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-full" />
          </li>
          <li>
            <Link
              to="/explore-universities"
              className="hover:text-red-500 cursor-pointer"
            >
              Universities
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-full" />
          </li>
          <li>
            <Link
              to={`/explore-universities?country=${university?.country}`}
              className="text-gray-900 font-medium cursor-pointer hover:text-red-500"
            >
              {university?.country}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-full" />
          </li>
          <li className=" font-medium text-red-600">{university?.name}</li>
        </ol>
      </nav>

      <div
        className="sticky top-28 z-40 bg-white shadow-md border-b"
        style={{ borderTop: "0.5px solid #D3D3D3" }}
      >
        <div className="mx-auto max-w-7xl flex overflow-x-auto sm:overflow-hidden">
          {TABS.map((tab, idx) => (
            <button
              key={tab.key}
              onClick={() => handleScrollTo(tab.key)}
              className={`px-4 md:px-6 py-3 text-gray-700 font-medium hover:text-red-500 whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-red-500 border-b-2 border-red-500"
                  : ""
              }`}
            >
              {tab?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content + Form */}
      <div className="w-full max-w-[1400px] mx-auto px-4  md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <div
            id="overview"
            ref={sectionRefs["overview"]}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* Header */}
            <div className="flex gap-2 items-start mb-4" data-aos="fade-right">
              <LayoutDashboard className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">Overview</h2>
            </div>

            {/* Overview text */}
            <div className="text-gray-700 space-y-4 text-sm sm:text-base">
              {university?.overview?.description ? (
                <p
                  key={university?.overview?.id}
                  data-aos="fade-up"
                  className="leading-relaxed mb-4 text-justify"
                  data-aos-anchor-placement="top-bottom"
                >
                  <RichText content={university?.overview?.description} />
                </p>
              ) : (
                <p data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                  {university?.name} is a modern university globally recognized
                  for high-quality education, applied research, and
                  international collaborations.
                </p>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div
                className="p-4 bg-red-50 rounded-lg text-center"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
              >
                <p className="text-xl font-bold text-red-600">
                  {university?.stats?.acceptanceRate}
                </p>
                <p className="text-sm">Acceptance Rate</p>
              </div>
              <div
                className="p-4 bg-blue-50 rounded-lg text-center"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
              >
                <p className="text-xl font-bold text-blue-600">
                  {university?.stats?.Total_International_Students}
                </p>
                <p className="text-sm">Total International Students</p>
              </div>
              <div
                className="p-4 bg-yellow-50 rounded-lg text-center"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
              >
                <p className="text-xl font-bold text-yellow-600">
                  {university?.stats?.ratio}
                </p>
                <p className="text-sm">Student to Faculty Ratio</p>
              </div>
              <div
                className="p-4 bg-green-50 rounded-lg text-center"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
              >
                <p className="text-xl font-bold text-green-600">
                  {university?.stats?.placement}
                </p>
                <p className="text-sm">Placement Rate</p>
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div
            id="rankings"
            ref={sectionRefs["rankings"]}
            className="mb-12"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div
              className="flex items-center gap-2 mb-4"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
            >
              <div>
                <BarChart3 className="w-6 h-6 text-red-500 shrink-0" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Rankings</h2>
            </div>

            {/* Description */}
            <div className="text-gray-700 mb-6 space-y-3 text-sm sm:text-base">
              <p
                key={university?.rankings?.id}
                className="leading-relaxed text-justify"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <RichText content={university?.rankings?.description} />
              </p>
            </div>

            {/* Ranking Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {university?.rankings?.items?.map((ranking, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
                  data-aos="zoom-in"
                  data-aos-anchor-placement="top-bottom"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center w-20 h-20">
                    <img
                      src="/assets/images/star.gif"
                      alt=""
                      className="object-none"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {ranking?.title}
                    </p>
                    <p className="text-gray-600">{ranking?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intakes */}
          <div
            id="intakes"
            ref={sectionRefs["intakes"]}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 mb-4"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
            >
              <CalendarDays className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">Intakes</h2>
            </div>

            {/* Intro Text */}
            <p
              className="text-gray-700 mb-6 text-justify text-sm sm:text-base"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <span
                key={university?.intakes?.id}
                className="block mb-2 leading-relaxed "
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                {university?.rankings?.description ? (
                  <RichText content={university?.intakes?.description} />
                ) : (
                  "The university offers multiple intakes throughout the year, with the main intakes in September, January, and May."
                )}
              </span>
            </p>

            {/* Accordion */}
            <div className="space-y-4">
              {university &&
                university?.intakes &&
                university?.intakes?.famous_intakes &&
                university?.intakes?.famous_intakes.map((intake, index) => (
                  <div
                    key={intake?.id || index}
                    className="bg-gray-100 rounded-md transition-all duration-300"
                    data-aos="zoom-in"
                    data-aos-anchor-placement="top-bottom"
                  >
                    {/* Summary / Toggle */}
                    <button
                      onClick={() => handleToggle(index)}
                      className="w-full text-left p-4 font-semibold text-lg text-gray-800 flex justify-between items-center"
                    >
                      <span>{intake?.title}</span>
                      <span
                        className={`transform transition-transform duration-300 ${
                          activeIndex === index ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ArrowDown color="red" />
                      </span>
                    </button>

                    {/* Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${
                        activeIndex === index ? "max-h-40 py-2" : "max-h-0 py-0"
                      }`}
                    >
                      <p className="text-gray-600">{intake?.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Top Courses */}
          <div
            id="courses"
            ref={sectionRefs["courses"]}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4" data-aos="fade-right">
              <BookOpen className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">
                <span>Top Courses at {university?.name}</span>
              </h2>
            </div>

            {/* Course Description */}
            <div className="text-gray-700 mb-6 space-y-2">
              <p
                key={university?.courses?.id}
                className="leading-relaxed text-justify"
                data-aos="fade-up"
              >
                <RichText content={university?.courses?.description} />
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="mb-6">
              <div className="flex gap-4 mb-8" data-aos="zoom-in">
                <button className="px-6 py-2 bg-red-600 text-white border-red-600 rounded-full">
                  Masters
                </button>
              </div>
            </div>

            {/* Course Cards Carousel */}
            <div
              className="w-full max-w-4xl mx-auto overflow-hidden"
              data-aos="fade-up"
            >
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides })?.map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-1 grid-rows-4 gap-4 p-4"
                  >
                    {university &&
                      university?.courses &&
                      university?.courses?.famous_courses &&
                      university?.courses?.famous_courses
                        ?.slice(
                          slideIndex * coursesPerPage,
                          (slideIndex + 1) * coursesPerPage
                        )
                        ?.map((course, index) => (
                          // .map((course, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col justify-between"
                            data-aos="zoom-in"
                          >
                            <h3 className="font-semibold text-lg mb-2">
                              {course?.name}
                            </h3>
                            <hr className="border-gray-200 mb-3" />
                            <div className="flex justify-between items-center text-sm text-gray-700">
                              <div>
                                <div className="font-medium text-black">
                                  {course?.annual_fee}
                                </div>
                                <div className="text-xs">Annual Fee</div>
                              </div>
                              <div>
                                <div className="font-medium text-black">
                                  {course?.duration}
                                </div>
                                <div className="text-xs">Duration</div>
                              </div>
                              <button
                                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                onClick={() => setShowPopup(true)}
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        ))}
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div
                className="flex justify-center items-center gap-4 mt-6"
                data-aos="fade-up"
              >
                <button
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  className={`p-2 rounded-full border transition ${
                    currentSlide === 0
                      ? "text-gray-400 border-gray-300 cursor-not-allowed"
                      : "text-black border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentSlide >= totalSlides - 1}
                  className={`p-2 rounded-full border transition ${
                    currentSlide >= totalSlides - 1
                      ? "text-gray-400 border-gray-300 cursor-not-allowed"
                      : "text-black border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <FaChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Cost to Study */}
          <div
            id="cost"
            ref={sectionRefs["cost"]}
            className="px-4 sm:px-6 lg:px-0"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="flex items-start gap-2 mb-4">
              <Wallet color="red" className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">
                Cost to Study {university?.name}, {university?.country}
              </h2>
            </div>
            <div className="text-gray-700 space-y-3 sm:space-y-4 text-sm sm:text-base">
              {university?.cost_of_study?.description ? (
                <p
                  key={university?.cost_of_study?.id}
                  className="leading-relaxed text-justify"
                >
                  <RichText content={university?.cost_of_study?.description} />
                </p>
              ) : (
                <p>
                  The average annual tuition fee for international students is
                  approximately £18,600.
                </p>
              )}
            </div>
            <div
              className="mt-6 sm:hidden"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
            >
              {university &&
                university?.cost_of_study &&
                university?.cost_of_study?.expenses_table &&
                university?.cost_of_study?.expenses_table?.map((row, index) => (
                  <div
                    key={row?.id || index}
                    className="bg-white rounded-2xl shadow-lg p-5 mb-5 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {row?.types_of_expenses}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">
                        Cost:{" "}
                      </span>
                      {row?.annual_expenses}
                    </p>
                  </div>
                ))}
            </div>

            {/* Desktop version → Table */}
            <div
              className="hidden sm:block mt-6 overflow-x-auto rounded-xl border border-gray-200"
              data-aos="fade-left"
            >
              <table className="min-w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 bg-red-200 text-black px-4 py-2 text-left font-semibold">
                      Types of Expenses
                    </th>
                    <th className="border border-gray-300 bg-red-200 text-black px-4 py-2 text-left font-semibold">
                      Annual Expenses in INR
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 bg-white">
                  {university &&
                    university?.cost_of_study &&
                    university?.cost_of_study?.expenses_table &&
                    university?.cost_of_study?.expenses_table?.map(
                      (row, index) => (
                        <tr key={row?.id || index}>
                          <td className="px-6 py-4 font-medium whitespace-nowrap border border-gray-200">
                            {row?.types_of_expenses}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                            {row?.annual_expenses}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scholarships */}
          <div id="scholarships" ref={sectionRefs["scholarships"]}>
            {/* Heading */}
            <div
              className="flex items-center gap-2 mb-4"
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-anchor-placement="top-bottom"
            >
              <Gift color="red" className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">Scholarships Available</h2>
            </div>

            {/* Scholarship Description */}
            <div
              className="text-gray-700 mb-6 space-y-3 text-sm sm:text-base"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              <p
                key={university?.scholarship?.id}
                className="leading-relaxed text-justify"
              >
                <RichText content={university?.scholarship?.description} />
              </p>
            </div>

            {/* Slider */}
            <div
              className="relative w-full max-w-6xl mx-auto overflow-hidden"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentScholarshipSlide * 100}%)`,
                }}
              >
                {university &&
                  university.scholarship &&
                  university.scholarship?.scholarship_details &&
                  university.scholarship?.scholarship_details?.map(
                    (scholarship, index) => (
                      <div
                        key={scholarship?.id || index}
                        className="min-w-full sm:min-w-[50%] md:min-w-[33.333%] p-4"
                        data-aos="fade-up"
                        data-aos-duration="900"
                        data-aos-anchor-placement="top-bottom"
                      >
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition flex flex-col justify-between h-full">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                              {scholarship?.title || "Scholarship Name"}
                            </h3>
                            <p className="text-gray-500 font-medium mb-2">
                              <span className="font-medium text-gray-800">
                                Amount:{" "}
                              </span>
                              {scholarship?.amount || "Varies"}
                            </p>
                            <p className="text-gray-500 font-medium mb-2">
                              <span className="font-medium text-gray-800">
                                Type:{" "}
                              </span>
                              {scholarship?.type || "type of study"}
                            </p>
                            <p className="text-gray-500 font-medium mb-2">
                              <span className="font-medium text-gray-800">
                                Level:{" "}
                              </span>
                              {scholarship?.level || "degree"}
                            </p>
                          </div>
                          <button
                            className="mt-6 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                            onClick={() => setShowPopup(true)}
                          >
                            View & Apply
                          </button>
                        </div>
                      </div>
                    )
                  )}
              </div>

              {/* Navigation Arrows */}
              <div
                className="flex justify-center items-center gap-4 mt-5 pb-2"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-anchor-placement="top-bottom"
              >
                <button
                  onClick={() =>
                    setCurrentScholarshipSlide((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentScholarshipSlide === 0}
                  className={`p-2 rounded-full shadow-md transition ${
                    currentScholarshipSlide === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setCurrentScholarshipSlide((prev) =>
                      Math.min(prev + 1, totalScholarships - 1)
                    )
                  }
                  disabled={currentScholarshipSlide >= totalScholarships - 1}
                  className={`p-2 rounded-full shadow-md transition ${
                    currentScholarshipSlide >= totalScholarships - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <FaChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Admissions */}
          <div
            id="admissions"
            ref={sectionRefs["admissions"]}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* Heading */}
            <div
              className="flex items-center gap-2 mb-4"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
            >
              <FileText color="red" className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">Admission Requirements</h2>
            </div>

            {/* Description */}
            <div
              className="text-gray-700 mb-6 space-y-3 text-sm sm:text-base"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <p
                key={university?.admissions?.id}
                className="leading-relaxed text-justify tracking-tight"
              >
                <RichText content={university?.admissions?.description} />
              </p>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-4 mb-6"
              data-aos="zoom-in"
              data-aos-anchor-placement="top-bottom"
            >
              {["masters"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab as "masters")}
                  className={`px-6 py-2 rounded-lg font-medium border transition-colors ${
                    selectedTab === tab
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-red-600 border-red-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {/* Academic Requirements */}
              {university &&
                university?.admissions &&
                university?.admissions?.admissions_req &&
                university?.admissions?.admissions_req?.map((admReq, index) => (
                  <div
                    key={admReq?.id || index}
                    className="rounded-xl bg-blue-50 border border-blue-200"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center p-4 font-semibold text-gray-800"
                    >
                      <span>{admReq?.title}</span>
                      <span className="text-red-600">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 space-y-2 text-sm text-gray-700">
                            {admReq?.requirement_items &&
                              admReq?.requirement_items?.map((req, idx) => (
                                <p
                                  key={req?.id || idx}
                                  className="flex items-center gap-2"
                                >
                                  <Check className="w-5 h-5 text-red-600 shrink-0" />
                                  {req?.requirement_item}
                                </p>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
            </div>
          </div>

          {/* Placements */}
          <div id="placements" ref={sectionRefs["placements"]}>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase
                color="red"
                className="w-6 h-6  text-red-500 shrink-0"
              />
              <h2 className="text-2xl font-bold">
                {university?.name}, {university?.country} Placements
              </h2>
            </div>
            <Suspense fallback={<UniversityPlacementSkeleton />}>
              <UniversityPlacement items={university?.placements || null} />
            </Suspense>
          </div>

          {/* Gallery */}
          <div
            id="gallery"
            ref={sectionRefs["gallery"]}
            className="px-4 sm:px-6 lg:px-0"
          >
            <div ref={sectionRefs["gallery"]}>
              <div className="flex items-center gap-2 mb-4">
                <Image color="red" className="w-6 h-6  text-red-500 shrink-0" />
                <h2 className="text-2xl font-bold">Gallery</h2>
              </div>
              <Suspense fallback={<UniversityGallerySkeleton />}>
                <UniversityGallery items={university?.gallerys || null} />
              </Suspense>
            </div>
          </div>

          {/* FAQs */}
          <div id="faq" ref={sectionRefs["faq"]}>
            <div className="flex items-center gap-2 mb-4">
              <Wallet color="red" className="w-6 h-6  text-red-500 shrink-0" />
              <h2 className="text-2xl font-bold">FAQs</h2>
            </div>
            <div className="w-full">
              <Suspense fallback={<FaqAccordionSkeleton />}>
                <FaqAccordion items={university?.faqs || null} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-[22%] bg-white shadow-md rounded-lg ">
            <div className="bg-blue-600 text-center text-white py-4 px-3">
              <h2 className="text-xl md:text-2xl font-bold">
                Want to Study in {university?.country} ?
              </h2>
              <p className="text-sm md:text-base">
                Fill in your details and we'll call you back
              </p>
            </div>
            <Suspense fallback={<WantTOStudyFormSkeleton />}>
              <WantTOStudyForm />
            </Suspense>
          </div>
        </div>
      </div>
      <style>{`

        .curved-before{
          height:80vh;
        }
        .curved-before::before {
        border-radius: 0 0 50% 50% / 0 0 100% 100%;
            transform: scaleX(2.1);
        }
        @media(max-width:768px){
            .curved-before{
          height:100vh;
        }
        }

      `}</style>
    </main>
  );
};

export default memo(UniversityDetails);
