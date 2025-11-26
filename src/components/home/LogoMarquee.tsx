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
  title: string;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  logos,
  reverse = false,
  title,
}) => {
  const repeated = [...logos, ...logos, ...logos, ...logos]; // Prevent gaps

  return (
    <div className="relative overflow-hidden w-full py-8 md:py-8">
      {/* Country heading */}
      <div className="flex justify-center">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-blue-800 mb-6 tracking-wide relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-blue-600 after:mx-auto after:mt-2">
          {title}
        </h3>
      </div>
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
  const usLogos = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/02_WRIGHTSTATE_BIPLANE_N_FULL.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/academy-of-art-university.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/arizona-state-university.webp",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/auburn-at-montgomery.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/A-State_Stack_2C_Light.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/attend-western.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/belltower.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/buffalo.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/california.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/California_State_University_Northridge.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/california-state-university-long-beach2264.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/centered_logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Charlotte-Master.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/concordia.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/CMU-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/CSU-FullyStacked-1.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/djs_ocu_01.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/download (1).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/download.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Duke-University-Logo-history.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Emef119Y_400x400.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/FSUSig_Horizontal_Color.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/florida-atlantic-logo-wordmark.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/George_Mason.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/George_Mason_University_logo.svg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/George_Mason_University_logo.svg-removebg-preview.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/golden-gate.jpeg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/GGU_ID_120821_Center_Color-300x139.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/GGU_ID_120821_Center_Color-300x139-removebg-preview.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/harvard-university-logo-1.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/image-asset.png",
  ];

  const ukLogos = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/980_university_liverpool_logo-removebg-preview2.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/187302.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/ARU-logo-1440x1080-1-1-1024x768.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/AU_Birmingham_logo_Purple_RGB.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/bcu-birmingham-city-university5078.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Black-Logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/cardiff-university.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/coventry-university-logo-scaled.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download (1).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download (2).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/download (8).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Heriot-Watt_University_logo.svg.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (2).jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (2).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (3).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (4).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (15).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (17).png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo_big.gif",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo-bpp-university.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Media_703659_smxx.webp",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/nottingham-trent-university-logo-square.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/the-university-of-south-wales-logo-6642E297DF-seeklogo.com.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/TU.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Leicester_logo_pillars.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Roehampton_logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University-of-Edinburgh-Logo.wine.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Essex_logo-removebg-preview.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-bpp.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-chester.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-east-anglia-logo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University-of-Greenwich-logo.jpeg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-portsmouth.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-warwick-warw7046.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/UON-Logo.png",
  ];

  const canadaLogos = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/alberta.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/algoma.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/brunswick.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/columbia.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/dalhousie.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/fairleigh.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/ibu.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/lakehead.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/laurentian.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/niagara.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/NYIT.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/regina.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/sfu.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/toronto2.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/UCalgary.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/vancouver.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/Waterloo.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/windsor.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Canada Universities Logos/York.png",
  ];

  const irelandLogos = [
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/Atlantic.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/dublin.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/dublin.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/dundaik.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/griffith.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/ibat.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/limerick.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/maynooth.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/mtu.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/nci.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/ollscil.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/SETU.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/tollscoil.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/trinity.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/tus.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/tusmidland.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/University_College_Cork.png",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/university-college-dublin.jpg",
    "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/Ireland Universities Logos/university-of-limerick.png",
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <SectionTitle title="250+ GLOBAL UNIVERSITY PARTNERS" />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4">
              <MarqueeRow logos={ukLogos} title="UK Universities" />
              <MarqueeRow logos={usLogos} reverse title="USA Universities" />
              <MarqueeRow logos={canadaLogos} title="Canada Universities" />
              <MarqueeRow
                logos={irelandLogos}
                reverse
                title="Ireland Universities"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default LogoMarquee;
