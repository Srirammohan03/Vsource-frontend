import React, { useEffect, useRef, useState } from "react";

const useCounter = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 100000,
      suffix: "+",
      label: "Students Empowered",
      icon: "/assets/images/icons/hat.gif",
    },
    {
      id: 2,
      value: 20,
      suffix: "+",
      label: "Years of Experience",
      icon: "/assets/images/icons/handshake.gif",
    },
    {
      id: 3,
      value: 10,
      suffix: "+",
      label: "Study Destinations",
      icon: "/assets/images/icons/earth.gif",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section w-full max-w-[1400px] mx-auto px-4 md:px-8 py-10 font-barlow"
    >
      <div
        className={`content flex flex-col lg:flex-row justify-between items-start ${
          isVisible ? "visible" : ""
        }`}
      >
        {/* LEFT CONTENT */}
        <div className="text-section w-full lg:w-1/2" data-aos="fade-right">
          <h1 data-aos="fade-right" data-aos-anchor-placement="top-bottom">
            About Vsource Overseas
          </h1>

          <p
            className="subheading my-4"
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
          >
            <strong>Your Gateway to Global Academic Excellence</strong>
          </p>

          <p className="paragraph" data-aos="fade-right">
            At VSource Overseas, we specialize in transforming academic ambition
            into international achievement. With a legacy of over 20 years, we
            are proud to be South India’s premier consultancy for Master’s
            admissions abroad, guiding thousands of students to top-ranked
            universities across the and other leading destinations.
          </p>

          <p className="paragraph" data-aos="fade-right">
            We partner with globally accredited universities known for academic
            excellence, innovation, and industry relevance, ensuring our
            students receive not only a quality education but also a launchpad
            for global careers.
          </p>

          <div className="my-2">
            <strong>Our Legacy in Numbers</strong>
          </div>

          {/* STATS SECTION */}
          <div className="stats" data-aos="zoom-in-up" data-aos-duration="800">
            {stats.map((stat, i) => {
              const count = useCounter(stat.value);
              return (
                <div
                  key={stat.id}
                  className="stat-block"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <img src={stat.icon} alt={stat.label} className="icon" />
                  <div className="count">
                    {count.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div
          className="image-section"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          <img
            src="/assets/images/founder.webp"
            alt="Founder"
            data-aos="fade-right"
            data-aos-duration="800"
          />
          <p
            className="caption"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            <strong style={{ fontSize: "20px" }}>“</strong>
            Redefining Education for Tomorrow’s Innovators
            <strong style={{ fontSize: "20px" }}>”</strong>
          </p>
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .about-section {
          font-family: 'Barlow', sans-serif;
          background-color: #fff;
          color: #333;
          padding: 40px 20px;
        }

        .content {
          display: flex;
          flex-direction: row;
          gap: 40px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        .content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .text-section {
          flex-basis: 60%;
          max-width: 60%;
        }

        .image-section {
          border: 1px solid grey;
          border-radius: 15px;
          padding: 5px;
          text-align: center;
          max-width: 40%;
          margin: 0 auto;
          flex-basis: 40%;
        }

        .stats {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-items: center;
          align-items: center;
          flex-wrap: wrap;
          padding: 20px 0;
          margin-top: 10px;
        }

        .stat-block {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 150px;
        }

        .icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .count {
          font-size: 27px;
          color: #1e73be;
          font-weight: bold;
        }

        .label {
          font-size: 18px;
          color: #555;
          margin-left: 8px;
          text-align: right;
          flex-basis: 50%;
        }

        h1 {
          font-size: 29px;
          color: #1e73be;
          margin-top: 20px;
        }

        .subheading {
          font-size: 20px;
          margin-bottom: 20px;
          color: black;
          margin-top: 20px;
        }

        .paragraph {
          font-size: 15px;
          line-height: 1.6;
          color: black;
          margin-bottom: 15px;
          margin-top: 10px;
        }

        .caption {
          font-size: 15px;
          color: black;
          margin-top: 10px;
        }

        @media (max-width: 1060px) {
          .content {
            flex-direction: column;
            align-items: center;
          }
          .text-section {
            flex-basis: 90%;
            max-width: 90%;
          }
          .image-section {
            max-width: 90%;
            flex-basis: 90%;
          }
        }

        @media (max-width: 768px) {
          .paragraph {
            text-align: justify;
          }
          h1 {
            font-size: 26px;
          }
          .subheading {
            font-size: 18px;
            margin-top: 10px;
          }
          .stats {
            flex-direction: column;
          }
        }

        @media (max-width: 485px) {
          .label {
            font-size: 15px;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
