import React, { useState, useEffect } from "react";
import {
  COUNTRIES,
  Country,
  University,
  useUniversities,
} from "@/lib/Universities";
import UniversityList from "@/components/UniversityList";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { toast } from "sonner";
import UniversityHomePageSkeleton from "@/Loaders/LandingPages/UniversityHomePageSkeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Pagination from "./Pagination";

const UniversityHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = Number(searchParams.get("page")) || 1;
  const { country } = useParams<{ country?: string }>();

  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch universities from API with country filter
  const {
    data: UNIVERSITIES,
    isError,
    isLoading,
    error,
  } = useUniversities(page, selectedCountry);

  useEffect(() => {
    if (country) setSelectedCountry(country);
    else setSelectedCountry("All");
  }, [country]);

  if (isError) {
    toast.error("Failed to load universities");
    console.error(error);
    return null;
  }

  if (isLoading || !UNIVERSITIES?.universities) {
    return <UniversityHomePageSkeleton />;
  }

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSearchParams({ page: "1" });
    const path =
      value === "All"
        ? "/explore-universities"
        : `/explore-universities/${value}`;
    navigate(path, { replace: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = UNIVERSITIES?.pagination?.pageCount;

  const displayedUniversities = searchQuery
    ? UNIVERSITIES?.universities?.filter(
        (uni: University) =>
          uni?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          uni?.campus?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    : UNIVERSITIES?.universities;

  return (
    <main>
      {/* Banner */}
      <div
        className="relative bg-cover bg-center bg-no-repeat pt-36 pb-20 overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/images/universitiess/universityHomeBg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 mb-6 container mx-auto max-w-6xl p-4">
          <div
            className="mx-auto max-w-3xl text-white rounded-xl p-6 text-center shadow"
            data-aos="fade-down-right"
          >
            <h2
              className="text-4xl font-bold text-red-600"
              data-aso-delay="200"
            >
              Explore Top Universities
            </h2>
            <p
              className="mt-2 text-sm sm:text-base opacity-90"
              data-aso-delay="300"
            >
              Filter by country and search to find the right match.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="relative z-10 -mt-16 flex justify-center px-4">
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col space-y-3"
            data-aos="zoom-in-up"
            data-aso-delay="100"
          >
            <label
              htmlFor="countrySelect"
              className="text-black-700 font-semibold text-2xl text-center"
            >
              Select Country
            </label>

            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger
                id="countrySelect"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition appearance-none"
              >
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Countries</SelectItem>
                {COUNTRIES.map((c: Country) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Count + Search */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-6 gap-4 mx-auto px-4 mt-3">
          <div className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
            Showing{" "}
            <span className="font-semibold text-red-600">
              {displayedUniversities.length}
            </span>{" "}
            universities
            {selectedCountry !== "All" && (
              <span className="ml-2">
                in{" "}
                <span className="font-semibold text-red-600">
                  {selectedCountry}
                </span>
              </span>
            )}
          </div>

          <div className="w-full md:w-80 flex items-center bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
            <input
              type="search"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 rounded-2xl focus:outline-none"
            />
            <button className="p-3 text-gray-500 hover:text-blue-500 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* University List */}
        <UniversityList universities={displayedUniversities} />

        <div className="h-8" />
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
        <div className="h-8" />
      </div>
    </main>
  );
};

export default UniversityHomePage;
