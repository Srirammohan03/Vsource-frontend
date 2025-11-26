import React, { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { StudyIn } from "@/types/StudyInPage";

const HeroBanner = lazy(() => import("../components/university/HeroBanner"));
const QuickLinksSection = lazy(
  () => import("../components/university/QuickLinksSection")
);
const OverviewHighlights = lazy(
  () => import("../components/university/OverviewHighlights")
);
const WhyStudyUK = lazy(() => import("../components/university/WhyStudyUK"));
const CityCostsTabs = lazy(
  () => import("../components/university/CityCostsTabs")
);
const AdmissionRequirementsUK = lazy(
  () => import("../components/university/AdmissionRequirementsUK")
);
const StudentVisaUK = lazy(
  () => import("../components/university/StudentVisaUK")
);
const PopularCourses = lazy(
  () => import("../components/university/PopularCourses")
);
const JobsInUK = lazy(() => import("../components/university/JobsInUK"));
const LogoMarquee = lazy(() => import("../components/university/LogoMarquee"));
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));

export const fetchStudyInUk = async () => {
  const { data } = await axios.get(
    `https://backend.vsourceoverseas.com/api/abroads?filters[key][$eq]=uk&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=alternativeText&populate[overview][populate][highlights]=true&populate[whyStudyin][populate][highlights_points]=true&populate[whyStudyin][populate][whyStudyin_cards]=true&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][0]=url&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][1]=documentId&populate[Living_Cost_Tuition_Fee][populate][cities][populate][image][fields][2]=alternativeText&populate[Living_Cost_Tuition_Fee][populate][cities][populate][tables][populate][label_values]=true&populate[admissions][populate][checklist][populate][texts]=true&populate[visa_requirements][populate][details]=true&populate[students_expriences][populate][images][fields][0]=url&populate[students_expriences][populate][images][fields][1]=documentId&populate[students_expriences][populate][images][fields][2]=alternativeText`
  );
  return data.data[0] || [];
};

const StudyUKPage = () => {
  const {
    data: studyInUk,
    isLoading,
    isError,
    error,
  } = useQuery<StudyIn>({
    queryKey: ["studyInUk"],
    queryFn: fetchStudyInUk,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load study in uk");
    console.error("failed to load study in uk", error);
    return null;
  }

  if (isLoading || !studyInUk) {
    return <BannerSkeleton />;
  }
  return (
    <Suspense fallback={<BannerSkeleton />}>
      <HeroBanner banner={studyInUk.banner || null} title={studyInUk.title} />

      {/* Quick links (solid red pills) */}
      <QuickLinksSection />

      {/* Anchor: Overview */}
      <section id="overview" className="anchor-section">
        <OverviewHighlights overview={studyInUk?.overview || null} />
        <WhyStudyUK whyStudyin={studyInUk?.whyStudyin || null} />
      </section>

      {/* Anchor: Costs */}
      <section id="costs" className="anchor-section">
        <CityCostsTabs
          living_Cost_Tuition_Fee={studyInUk?.Living_Cost_Tuition_Fee || null}
        />
      </section>

      {/* Anchor: Admissions */}
      <section id="admissions" className="anchor-section">
        <AdmissionRequirementsUK admissions={studyInUk?.admissions || null} />
        <StudentVisaUK
          visa_requirements={studyInUk?.visa_requirements || null}
        />
      </section>

      {/* Anchor: Top Universities */}
      <section id="top-universities" className="anchor-section">
        <LogoMarquee />
      </section>

      <PopularCourses />

      {/* Anchor: Jobs */}
      <section id="jobs" className="anchor-section">
        <JobsInUK
          students_expriences={studyInUk?.students_expriences || null}
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

export default StudyUKPage;
