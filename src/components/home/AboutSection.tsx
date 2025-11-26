import React, { useState, useEffect, useRef } from "react";

const stats = [
  {
    id: 1,
    value: 100000,
    suffix: "+",
    label: "Students Empowered",
    icon: "https://cdn-icons-gif.flaticon.com/6454/6454106.gif",
  },
  {
    id: 2,
    value: 20,
    suffix: "+",
    label: "Years of\nExperience",
    icon: "https://cdn-icons-gif.flaticon.com/15370/15370761.gif",
  },
  {
    id: 3,
    value: 10,
    suffix: "+",
    label: "Study Destinations",
    icon: "https://cdn-icons-gif.flaticon.com/15747/15747340.gif",
  },
];

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger counter animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Counter Animation Hook
  const useCounter = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);
    useEffect(() => {
      if (!isVisible) return;
      let startTime: number | null = null;
      const step = (t: number) => {
        if (startTime === null) startTime = t;
        const p = Math.min((t - startTime) / duration, 1);
        setCount(Math.floor(p * (end - start) + start));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [end, start, duration, isVisible]);
    return count;
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="top-section">
          {/* Left Side */}
          <div className="left">
            <h2
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              className="text-[#1e73be]"
            >
              About Vsource Overseas
            </h2>

            <p
              className="desc pb-3 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <strong className="font-bold">
                South India's Leading Educational Group for Higher Education.
              </strong>
            </p>

            <p className="para" data-aos="fade-right" data-aos-duration="1000">
              100% Educational Loan Guidance provided to support your academic
              journey.
            </p>

            <hr className="my-3 border-gray-300" />

            <ul className="features space-y-2">
              <li data-aos="fade-right" data-aos-duration="800">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10490/10490249.png"
                  alt="check"
                />
                <span>
                  Guided thousands of students to{" "}
                  <span className="font-bold">Top-ranked universities</span>
                </span>
              </li>

              <li data-aos="fade-right" data-aos-duration="800">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3176/3176293.png"
                  alt="globe"
                />
                <span>
                  Expertise in destinations like the{" "}
                  <span className="font-bold">
                    USA, UK, Canada, Ireland, and more
                  </span>
                </span>
              </li>

              <li data-aos="fade-right" data-aos-duration="800">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/7339/7339281.png"
                  alt="university"
                />
                <span>
                  Direct partnerships with{" "}
                  <span className="font-bold">
                    Globally accredited universities
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div
            className="right"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <img
              src="/assets/images/founder.webp"
              alt="Founder"
              className="founder-img"
            />
            <p className="quote">
              “Redefining Education for Tomorrow’s Innovators”
            </p>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="bottom-section">
          {stats.map((stat, i) => {
            const count = useCounter(stat.value);
            return (
              <div
                key={stat.id}
                className="stat-box"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="left-box">
                  <img src={stat.icon} alt="" className="icon" loading="lazy" />
                  <div className="count text-[#1e73be]">
                    {count.toLocaleString("en-US")}
                    {stat.suffix}
                  </div>
                </div>
                <div className="label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Styling */}
      <style>{`
        .about-section {
          padding: clamp(32px, 4vw, 50px) 16px;
          background: #fff;
          font-family: 'Barlow', sans-serif;
          color: #111;
        }

        .top-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .top-section {
            grid-template-columns: 65% 30%;
            gap: 32px;
            align-items: start;
          }
        }

        .left { min-width: 0; }
        .right { display: flex; flex-direction: column; align-items: center; }

        h2 {
          font-size: clamp(30px, 3.6vw, 32px);
          font-weight: 700;
          margin: 0;
        }

        .desc {
          font-size: clamp(20px, 2.5vw, 25px);
          margin: 8px 0 0;
          line-height: 1.6;
        }

        .para {
          font-size: clamp(15px, 2.3vw, 16px);
          margin: 8px 0 0;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
          display: grid;
          gap: 10px;
        }

        .features li {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 10px;
          font-size: clamp(15px, 2.3vw, 15px);
          align-items: center;
        }

        .features li img {
          width: 22px;
          height: 22px;
          margin-top: 2px;
        }

        .founder-img {
          width: 100%;
          max-width: 450px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }

        .quote {
          font-style: italic;
          margin-top: 10px;
          text-align: center;
          font-size: 15px;
        }

        .bottom-section {
          margin-top: clamp(28px, 6vw, 50px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 80%;
          margin: clamp(28px, 6vw, 50px) auto 0;
        }

        @media (min-width: 640px) {
          .bottom-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .bottom-section {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .stat-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #0069E9;
          border-radius: 8px;
          padding: 13px;
          min-height: 80px;
          background: #fff;
          box-sizing: border-box;
        }

        .left-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          color: #1e73be;
          white-space: nowrap;
        }

        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          color: #111;
          line-height: 1.3;
          text-align: right;
          margin-left: 10px;
          width: 34%;
        }

        @media (max-width: 380px) {
          .stat-box { gap: 8px; padding: 10px; }
          .count { font-size: 18px; }
          .label { font-size: 12px; }
        }

        @media (max-width: 540px) {
          .left-box {
            width: 50%;
            justify-content: space-between;
          }
          .stat-box:first-child .left-box {
            width: 60%;
            justify-content: space-between;
          }
        }

       

        @media (prefers-reduced-motion: reduce) {
          .about-section * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
