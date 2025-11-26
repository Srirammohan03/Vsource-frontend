import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { StudyIn } from "@/types/StudyInPage";
import React, { Suspense, lazy, useEffect } from "react";

const HeroBanner = lazy(() => import("../components/france/HeroBanner"));
const QuickLinksSection = lazy(
  () => import("../components/france/QuickLinksSection")
);
const OverviewHighlights = lazy(
  () => import("../components/france/OverviewHighlights")
);
const WhyStudyFrance = lazy(
  () => import("../components/france/WhyStudyFrance")
);
const CityCostsTabs = lazy(() => import("../components/france/CityCostsTabs"));
const AdmissionRequirementsFrance = lazy(
  () => import("../components/france/AdmissionRequirementsFrance")
);
const StudentVisaFrance = lazy(
  () => import("../components/france/StudentVisaFrance")
);
const PopularCourses = lazy(
  () => import("../components/france/PopularCourses")
);
const JobsInFrance = lazy(() => import("../components/france/JobsInFrance"));
const LogoMarquee = lazy(() => import("../components/france/LogoMarquee"));
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));

export const fetchStudyInFrance = async () => {
  const { data } = await axios.get(
    `https://backend.vsourceoverseas.com/api/abroads?filters[key][$eq]=france&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][images][fields][0]=url&populate[students_expriences][populate][images][fields][1]=documentId&populate[students_expriences][populate][images][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyFrance = () => {
  const {
    data: studyInFrance,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInFrance"],
    queryFn: fetchStudyInFrance,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load study in usa");
    console.error("failed to load study in usa", error);
    return null;
  }

  if (isLoading || !studyInFrance) {
    return <BannerSkeleton />;
  }

  return (
    <Suspense fallback={<BannerSkeleton />}>
      <HeroBanner
        banner={studyInFrance?.banner || null}
        title={studyInFrance?.title}
      />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInFrance?.overview || null} />
        <WhyStudyFrance whyStudyin={studyInFrance?.whyStudyin || null} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={
            studyInFrance?.Living_Cost_Tuition_Fee || null
          }
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsFrance
          admissions={studyInFrance?.admissions || null}
        />
        <StudentVisaFrance
          visa_requirements={studyInFrance?.visa_requirements || null}
        />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
        <LogoMarquee />
      </section>

      <PopularCourses />

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInFrance
          students_expriences={studyInFrance?.students_expriences || null}
        />
      </section>

      <VideoCarousel />

      {/* Small helpers for smooth anchor spacing under fixed header */}
      <style>{`
        html { scroll-behavior: smooth; }
        .anchor-section { scroll-margin-top: 100px; } /* adjust for your fixed header */
      `}</style>
    </Suspense>
  );
};

export default StudyFrance;
