import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { memo } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkblue text-white py-12">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        {/* Top Grid: Company Info + Services + Quick Links + Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:mb-12 mb-4">
          {/* Column 1: Company Info & Socials */}
          <div>
            <p className="text-gray-400 mb-4">
              Your trusted educational consultancy with 20+ years of experience
              in university admissions, overseas education, and educational
              loans.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[
                {
                  href: "https://www.facebook.com/share/Up9qaiBuTj25dG5z/?mibextid=qi2Omg",
                  src: "/assets/images/icons/fb.webp",
                  alt: "Facebook",
                },
                {
                  href: "https://www.instagram.com/vsource_overseas/?igsh=M2dmemcwaHU5eHJy",
                  src: "/assets/images/icons/insta.webp",
                  alt: "Instagram",
                },
                {
                  href: "https://www.youtube.com/channel/UCNVjrnqI9L873rkB-5_p4kA",
                  src: "/assets/images/icons/yt.webp",
                  alt: "YouTube",
                },
                {
                  href: "https://in.linkedin.com/company/vsource-educational-consultants",
                  src: "/assets/images/icons/linked in.webp",
                  alt: "LinkedIn",
                },
              ]?.map((icon, index) => (
                <a
                  key={index}
                  href={icon?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${icon?.alt} page`}
                  className="group"
                >
                  <img
                    src={icon?.src}
                    alt={icon?.alt}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="
          w-10 h-10 md:w-14 md:h-14 
          transition-transform duration-300 
          group-hover:scale-110 
          select-none pointer-events-auto
        "
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Indian University Admissions",
                "MBBS/Masters Abroad",
                "Student Loans",
                "Career Counseling",
              ]?.map((service) => (
                <li key={service}>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Gallery", path: "/gallery" },
                { name: "Branches", path: "/contact" },
                { name: "Study In UK", path: "/study-in-uk" },
                { name: "Study In USA", path: "/study-in-usa" },
                { name: "Study In Canada", path: "/study-in-canada" },
                { name: "Study In Ireland", path: "/study-in-ireland" },
                { name: "Study In France", path: "/study-in-france" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center flex-wrap">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400">+91 91217 11119</span>
              </li>
              <li className="flex items-center flex-wrap">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400 break-all">
                  Support@vsourceoverseas.com
                </span>
              </li>
              {/* <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary mt-1 shrink-0" />
                <span className="text-gray-400">
                  Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar,
                  Hyderabad- 500060, Telangana.
                </span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Grid: Corporate Office / Branches */}
        <div className="border-t border-gray-800 md:pt-8 pt-5">
          <h2 className="text-2xl font-bold mb-6">CORPORATE OFFICE</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Telangana */}
            <div>
              <h4 className="font-semibold mb-2 text-xl">TELANGANA</h4>
              {[
                {
                  name: "DILSUKHNAGAR",
                  address:
                    "Vsource, Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar, Hyderabad- 500060, Telangana.",
                },
                {
                  name: "AMEERPET",
                  address:
                    "Vsource, Vsource Building, Kamma Sangam lane, Ameerpet, Hyderabad-500073, Telangana.",
                },
                {
                  name: "KPHB- JNTU",
                  address:
                    "Vsource, Beside JNTU Metro station Near ICICI Bank, Hyderabad, Telangana.",
                },
              ].map((branch) => (
                <div key={branch.name} className="mb-2">
                  <h5 className="font-medium text-md">{branch.name}</h5>
                  <p className="text-gray-400 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>

            {/* Andhra Pradesh */}
            <div>
              <h4 className="font-semibold mb-2 text-xl">ANDHRA PRADESH</h4>
              {[
                {
                  name: "VIJAYAWADA",
                  address:
                    "Vsource, 1st floor, Mouli Towers, Beside Reliance Trends, Benz Circle, Vijayawada, Andhra Pradesh.",
                },
                {
                  name: "TIRUPATHI",
                  address:
                    "Vsource, 19-3-1/s, 3rd Floor, Renigunta Rd, Postal Colony, Near Jawa Show Room, Tirupathi - 517501.",
                },
                {
                  name: "VISAKHAPATNAM",
                  address:
                    "Vsource, RK, Annapurna Nilayam 2nd Floor, Opposite Hotel Kamat, Lawson's Bay Colony, Dr NTR Beach Rd, Visakhapatnam, Andhra Pradesh 530017.",
                },
              ].map((branch) => (
                <div key={branch.name} className="mb-2">
                  <h5 className="font-medium text-md">{branch.name}</h5>
                  <p className="text-gray-400 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>

            {/* Karnataka */}
            <div>
              <h4 className="font-semibold mb-2 text-xl">KARNATAKA</h4>
              {[
                {
                  name: "BENGALURU",
                  address:
                    "Vsource, #88, 9th cross G- Block Sahakar Nagar Bengaluru-560092 Karnataka.",
                },
              ].map((branch) => (
                <div key={branch.name} className="mb-2">
                  <h5 className="font-medium text-md">{branch.name}</h5>
                  <p className="text-gray-400 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 mb-4 md:mb-0 text-sm">
            © {currentYear}{" "}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="text-white hover:underline"
            >
              Vsource Overseas
            </a>{" "}
            All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6 text-sm">
            <a
              href="https://vsourceadmissions.com/Privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://vsourceadmissions.com/Terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
