import { Image } from "@/types/LandingPage";
import React, { memo } from "react";

interface UniversityGalleryProps {
  items: Image[];
}

const UniversityGallery: React.FC<UniversityGalleryProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items?.map((image, index) => (
        <div
          key={image?.id || index}
          className={`rounded-lg overflow-hidden 
            ${
              // Only apply collage spans on larger screens
              index === 0 ? "lg:row-span-2" : ""
            }
          `}
        >
          <img
            src={`https://backend.vsourceoverseas.com${image?.url}`}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default memo(UniversityGallery);
