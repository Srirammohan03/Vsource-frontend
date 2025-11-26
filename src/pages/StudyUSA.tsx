import React, { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { StudyIn } from "@/types/StudyInPage";

const HeroBanner = lazy(() => import("../components/usa/HeroBanner"));
const QuickLinksSection = lazy(
  () => import("../components/usa/QuickLinksSection")
);
const OverviewHighlights = lazy(
  () => import("../components/usa/OverviewHighlights")
);
const WhyStudyUSA = lazy(() => import("../components/usa/WhyStudyUSA"));
const CityCostsTabs = lazy(() => import("../components/usa/CityCostsTabs"));
const AdmissionRequirementsUSA = lazy(
  () => import("../components/usa/AdmissionRequirementsUSA")
);
const StudentVisaUSA = lazy(() => import("../components/usa/StudentVisaUSA"));
const PopularCourses = lazy(() => import("../components/usa/PopularCourses"));
const JobsInUSA = lazy(() => import("../components/usa/JobsInUSA"));
const LogoMarquee = lazy(() => import("../components/usa/LogoMarquee"));
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));

export const fetchStudyInUsa = async () => {
  const { data } = await axios.get(
    `https://backend.vsourceoverseas.com/api/abroads?filters[key][$eq]=usa&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][images][fields][0]=url&populate[students_expriences][populate][images][fields][1]=documentId&populate[students_expriences][populate][images][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyUSA = () => {
  const {
    data: studyInUsa,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInUSA"],
    queryFn: fetchStudyInUsa,
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

  if (isLoading || !studyInUsa) {
    return <BannerSkeleton />;
  }

  return (
    <Suspense fallback={<BannerSkeleton />}>
      <HeroBanner
        banner={studyInUsa?.banner || null}
        title={studyInUsa?.title}
      />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInUsa?.overview || null} />
        <WhyStudyUSA whyStudyin={studyInUsa?.whyStudyin || null} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={studyInUsa?.Living_Cost_Tuition_Fee || null}
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsUSA admissions={studyInUsa?.admissions || null} />
        <StudentVisaUSA
          visa_requirements={studyInUsa?.visa_requirements || null}
        />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
        <LogoMarquee />
      </section>

      <PopularCourses />

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInUSA
          students_expriences={studyInUsa?.students_expriences || null}
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

export default StudyUSA;
