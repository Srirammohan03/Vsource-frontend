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
  const usLogos1 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/02_WRIGHTSTATE_BIPLANE_N_FULL.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/academy-of-art-university.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/arizona-state-university.webp",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/auburn-at-montgomery.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/A-State_Stack_2C_Light.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/attend-western.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University_of_the_Pacific_logo.png.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Seal_of_the_University_of_Michigan.svg.png",
  ];

  const usLogos2 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/buffalo.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/california.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/California_State_University_Northridge.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/california-state-university-long-beach2264.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Charlotte-Master.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/belltower.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University-of-Missouri-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University-of-Maryland-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University_of_Massachusetts_Dartmouth_seal.svg.png",
  ];

  const usLogos3 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/CMU-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/concordia.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/download (1).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/download.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Duke-University-Logo-history.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University-of-Washington-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/university-of-toledo9856.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University-of-Oklahoma-Symbol-removebg-preview.png",
  ];

  const usLogos4 = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/FSUSig_Horizontal_Color.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/florida-atlantic-logo-wordmark.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/George_Mason.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/GGU_ID_120821_Center_Color-300x139-removebg-preview.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/harvard-university-logo-1.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/image-asset.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/vust.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/VerticalLogoBlue-resized.png",
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <SectionTitle
            title="Top Universities & Courses"
            // subtitle="We collaborate with prestigious institutions worldwide to offer you the best educational opportunities"
          />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4 space-y-4">
              <MarqueeRow logos={usLogos1} />
              <MarqueeRow logos={usLogos2} reverse />
              <MarqueeRow logos={usLogos3} />
              <MarqueeRow logos={usLogos4} reverse />
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
