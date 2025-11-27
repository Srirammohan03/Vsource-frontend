import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { University } from "@/lib/Universities";
import DelayedPopup from "./DelayedPopup";

interface Props {
  university: University;
}

const UniversityCard: React.FC<Props> = ({ university }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden  hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div className="w-[90%] mx-auto p-6 flex justify-center items-center h-40 border-b border-gray-300">
        <img
          src={`https://backend.vsourceoverseas.com${university?.logo?.url}`}
          alt={`${university.name} logo`}
          className="max-w-full max-h-full object-contain"
          data-aos="zoom-in"
          data-aos-anchor-placement="top-bottom"
        />
      </div>
      <div
        className="p-6 flex flex-col items-center text-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <h3 className="font-bold text-xl text-gray-900 mb-1">
          {university.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {university.campus}, {university.country}
        </p>
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate max-w-full"
        >
          {university.website}
        </a>
      </div>
      <div className="flex border-t border-gray-200">
        <Link
          to={`/explore-universities/${university.country}/${university?.slug}/${university?.documentId}`}
          className="flex-1 px-4 py-3 text-center text-sm font-medium text-red-600 "
        >
          Know More
        </Link>
        <button
          onClick={() => setShowPopup(true)}
          className="flex-1 px-4 py-3 text-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
        >
          Apply Now.
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
  );
};

export default memo(UniversityCard);
