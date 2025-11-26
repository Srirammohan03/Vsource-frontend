import React from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

// Inject animation styles with mobile-specific speed
const style = `
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

/* Default speed: Desktop (30s) */
.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

/* Faster on mobile: override animation duration */
@media (max-width: 768px) {
  .animate-marquee {
    animation-duration: 15s;
  }
  .animate-marquee-reverse {
    animation-duration: 15s;
  }
}
`;

interface MarqueeRowProps {
  logos: string[];
  reverse?: boolean;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ logos, reverse = false }) => {
  const repeated = [...logos, ...logos, ...logos, ...logos]; // Prevent gaps

  return (
    <div className="relative overflow-hidden w-full py-2 md:py-4">
      <div
        className={`flex w-[200%] whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {repeated.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-4 w-[140px] md:w-[180px] h-[60px] md:h-[80px] flex items-center justify-center"
          >
            <img
              src={logo}
              alt="university logo"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
              }}
            />
          </div>
        ))}
      </div>

      {/* Edge gradients for blur effect */}
      <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
};

const LogoMarquee = () => {
  const ukLogos1 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/980_university_liverpool_logo-removebg-preview2.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/187302.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/ARU-logo-1440x1080-1-1-1024x768.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/AU_Birmingham_logo_Purple_RGB.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/bcu-birmingham-city-university5078.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Black-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/cardiff-university.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/coventry-university-logo-scaled.jpg",
  ];

  const ukLogos2 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download (1).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download (2).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download (8).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Heriot-Watt_University_logo.svg.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (2).jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (2).png",
  ];

  const ukLogos3 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (3).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (4).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (15).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (17).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo_big.gif",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo-bpp-university.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Media_703659_smxx.webp",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/nottingham-trent-university-logo-square.png",
  ];

  const ukLogos4 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/the-university-of-south-wales-logo-6642E297DF-seeklogo.com.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/TU.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Leicester_logo_pillars.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Roehampton_logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Edinburgh-Logo.wine.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Essex_logo-removebg-preview.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-bpp.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-chester.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-east-anglia-logo.png",
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Top Universities & Courses"
            // subtitle="We collaborate with prestigious institutions worldwide to offer you the best educational opportunities"
          />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4 space-y-4">
              <MarqueeRow logos={ukLogos1} />
              <MarqueeRow logos={ukLogos2} reverse />
              <MarqueeRow logos={ukLogos3} />
              <MarqueeRow logos={ukLogos4} reverse />
            </div>
          </AnimateOnScroll>

          {/* <AnimateOnScroll delay={200}>
            <div className="mt-8 md:mt-12 text-center">
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Our strong partnerships with these universities ensure that our students receive
                preferential admissions consideration, specialized programs, and exclusive scholarship opportunities.
              </p>
            </div>
          </AnimateOnScroll> */}
        </div>
      </section>
    </>
  );
};

export default LogoMarquee;
