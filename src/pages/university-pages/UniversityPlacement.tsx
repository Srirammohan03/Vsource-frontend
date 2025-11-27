import { Description, Image } from "@/types/LandingPage";
import RichText from "@/utils/RichText";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { memo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Placement {
  id?: number;
  description: string;
  jobs: { id?: number; job_profiles: string; average_salary: string }[];
  top_recruiters_imgs: Image[];
}

interface PlacementProps {
  items: Placement;
}

const UniversityPlacement: React.FC<PlacementProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemsPerView = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(
    items?.top_recruiters_imgs?.length / itemsPerView
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <div
        className="space-y-2"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos-anchor-placement="top-bottom"
      >
        <p
          key={items?.id}
          className="text-gray-700 text-justify tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <RichText content={items?.description} />
        </p>
      </div>

      {/* Recruiters Carousel */}
      <div
        data-aos="zoom-in"
        data-aos-duration="1200"
        data-aos-once="true"
        data-aos-anchor-placement="top-bottom"
      >
        <h2 className="text-xl font-bold mb-4">Top Recruiters</h2>
        <div className="relative w-full overflow-hidden py-3">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${
                (items?.top_recruiters_imgs?.length / itemsPerView) * 100
              }%`,
              transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
            }}
          >
            {items?.top_recruiters_imgs &&
              items?.top_recruiters_imgs?.map((src, index) => (
                <div
                  key={src?.id || index}
                  className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center p-4"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="bg-white shadow-md rounded-xl p-6 flex justify-center items-center h-40 w-full">
                    <img
                      src={`https://backend.vsourceoverseas.com${src?.url}`}
                      alt={`Recruiter ${index}`}
                      className="max-h-16 object-contain"
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Controls */}
          <div
            className="flex justify-center gap-3"
            data-aos="fade-in"
            data-aos-anchor-placement="top-bottom"
          >
            <button onClick={prevSlide} className="p-2 rounded-full shadow-md">
              <FaChevronLeft size={16} />
            </button>
            <button onClick={nextSlide} className="p-2 rounded-full shadow-md">
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div
        className="overflow-x-auto rounded-lg"
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-once="true"
        data-aos-anchor-placement="top-bottom"
      >
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr
              className="bg-blue-100"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <th className="border border-gray-300 bg-red-200 text-black px-4 py-2 text-left">
                Job Profiles
              </th>
              <th className="border border-gray-300 bg-red-200 text-black px-4 py-2 text-left">
                Average Salary in £
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.jobs?.map((job, index) => (
              <tr
                key={job?.id || index}
                className="hover:bg-gray-50"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {job?.job_profiles}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job?.average_salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(UniversityPlacement);
