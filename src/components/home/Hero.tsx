import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DelayedPopup from "../DelayedPopup";
import { PopupModal } from "react-calendly";
// import badgeImage from "@/assets/homepage/20-years-logo.webp";

const animatedTexts = [
  ["STUDY MASTER'S", "IN USA, UK IRELAND, CANADA, FRANCE"],
];
const flagUrls = {
  fr: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_64,h_64,c_limit,dpr_auto/v1762702273/fr_cdemdi.svg",
  us: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_64,h_64,c_limit,dpr_auto/v1762702274/us_ruv7bj.svg",
  ie: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_64,h_64,c_limit,dpr_auto/v1762702273/ie_eixitt.svg",
  ca: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_64,h_64,c_limit,dpr_auto/v1762702273/ca_p8rr4y.svg",
  gb: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_64,h_64,c_limit,dpr_auto/v1762702273/gb_ywaagd.svg",
};

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % animatedTexts.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const handleMinimize = () => {
    setShowPopup(false);
  };
  const handleGoVirtual = () => {
    setOpenCalendly(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 md:pt-0">
      <motion.div
        className="hidden md:block absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/assets/images/vsource 1.png')",
          }}
        />
        <div className="absolute inset-0 bg-grey opacity-30 z-10 mix-blend-overlay" />
      </motion.div>

      <motion.div
        className="block md:hidden absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundImage: "url('/assets/images/SLIDER nn-01.png')",
        }}
      />

      {/* Right-side Girl Image (Hidden on Mobile) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:flex justify-end">
        <motion.img
          src="/assets/images/vsource.png"
          alt="Girl"
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="object-contain h-full max-h-[120vh]"
          style={{ right: 0 }}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Content */}
      <motion.div
        className="w-full max-w-[1400px] mx-auto px-4 z-20 text-center lg:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block space-y-6 pt-28">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-md max-w-3xl space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-[42px] md:text-[52px] leading-tight font-bold text-black max-w-2xl"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Your <span style={{ color: "#e40000" }}>Global</span> Pathway{" "}
                <br /> to Academic{" "}
                <span style={{ color: "#e40000" }}>Excellence</span>
              </motion.h1>

              <div className="space-y-1">
                {animatedTexts[currentTextIndex].map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 * idx, duration: 0.5 }}
                    className="text-lg text-black font-medium"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-start pt-6"
            >
              <img
                src="/assets/images/20 years logo.png"
                alt="20 Years Logo"
                className="w-36 h-auto"
                loading="lazy"
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/explore-universities"
                className="bg-[#D93F36] text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-[#c2352d] transition-colors"
              >
                Explore Universities
              </Link>
              <a
                onClick={handleGoVirtual}
                className="bg-white border border-white text-black px-6 py-3 rounded-md font-semibold text-lg hover:bg-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Book Free Counseling</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-sm text-black">4.9/5 Rating</span>
              </div>
              <div className="text-sm font-semibold text-black">
                100,000+ Students Guided
              </div>
              <div className="text-sm font-semibold text-black">
                250+ Global University Partners
              </div>
            </motion.div>
          </div>

          <div className="md:hidden relative flex flex-col min-h-screen pt-[250px] px-4 z-10 font-[Poppins]">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-[40px] left-[-10px] bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-[280px] text-left shadow-sm"
            >
              <p className="text-red-600 text-[16px] font-bold leading-tight uppercase tracking-wide">
                GLOBAL
                <br />
                TOP
                <br />
                UNIVERSITIES
              </p>
              <p className="text-[10px] text-orange-400 font-semibold mt-2 animate-blink">
                FALL-INTAKE 2025-2026
              </p>
              <div className="bg-white rounded-xl px-2 py-1 mt-3 flex justify-center gap-1 w-fit mx-auto">
                {["fr", "us", "ie", "ca", "gb"].map((flag, idx) => (
                  <img
                    key={idx}
                    src={`https://flagcdn.com/${flag}.svg`}
                    alt={flag.toUpperCase()}
                    className="w-4 h-4 object-cover rounded-full"
                    loading="lazy"
                    decoding="async"
                    fetchPriority={idx < 3 ? "high" : "low"}
                  />
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 bg-red-600 text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow hover:bg-red-700 transition"
                onClick={() => setShowPopup(true)}
              >
                APPLY NOW
              </motion.button>
              <img
                src="/assets/images/20 years logo.png"
                alt="20 Years Logo"
                className="w-20 h-auto mt-4 "
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>

            <div className="mt-auto w-full text-center pb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/10 backdrop-blur-sm 
                    px-6 py-5 rounded-2xl max-w-xl mx-auto shadow-md border border-white/20 
                    flex flex-col items-center text-center"
              >
                <p className="text-[18px] sm:text-[20px] font-semibold text-white leading-snug">
                  Your Gateway to
                </p>
                <p className="text-[18px] sm:text-[20px] font-semibold text-white">
                  <span className="text-red-600 font-bold">Global</span>{" "}
                  Academic Excellence
                </p>
                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    to="/explore-universities"
                    className="flex-1 bg-[#D93F36] text-white px-6 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-[#c2352d] hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Explore Universities
                  </Link>

                  <a
                    onClick={handleGoVirtual}
                    className="bg-white border border-white text-black px-6 py-3 rounded-md font-semibold text-lg hover:bg-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Book Free Counseling</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .animate-blink {
      animation: blink 1.4s infinite;
    }
  `}</style>

      {showPopup && <DelayedPopup onMinimize={handleMinimize} />}
      <PopupModal
        url="https://calendly.com/server-vsourceoverseas/30min"
        open={openCalendly}
        onModalClose={() => setOpenCalendly(false)}
        rootElement={document.getElementById("root")}
        pageSettings={{ hideEventTypeDetails: false }}
      />
    </section>
  );
};

export default Hero;
