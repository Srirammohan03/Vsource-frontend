import { useState, useEffect, useRef, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [destOpen, setDestOpen] = useState(false); // desktop dropdown
  const [mobileDestOpen, setMobileDestOpen] = useState(false); // mobile accordion
  const location = useLocation();
  const destRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileDestOpen(false);
  }, [location]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    // Study in Destination will be injected here
    { name: "Explore Universities", path: "/explore-universities" },
    {
      name: "360 View",
      path: "/view-360",
      external: false,
    },
    { name: "Gallery", path: "/gallery" },
    { name: "Branches", path: "/contact" },
  ];

  const destinations = [
    { name: "Study in UK", path: "/study-in-uk", flag: "gb" },
    { name: "Study in USA", path: "/study-in-usa", flag: "us" },
    { name: "Study in CANADA", path: "/study-in-canada", flag: "ca" },
    { name: "Study in IRELAND", path: "/study-in-ireland", flag: "ie" },
    { name: "Study in FRANCE", path: "/study-in-france", flag: "fr" },
  ];

  const linkColor = (path: string) =>
    location.pathname === path
      ? "text-primary"
      : isScrolled
      ? "text-gray-800"
      : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } py-4`}
    >
      {/* Custom container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl shadow-md"
            src="/assets/images/red vs logo.PNG"
          />
          <div>
            <img
              src="/assets/images/20 years logo-01.png"
              alt="20 Years Logo"
              className="h-20 md:h-18 ml-3 w-auto object-contain drop-shadow-md"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/"
            className={`font-medium transition-colors hover:text-primary ${linkColor(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className={`font-medium transition-colors hover:text-primary ${linkColor(
              "/about-us"
            )}`}
          >
            About Us
          </Link>

          {/* Study in Destination Dropdown */}
          <div
            ref={destRef}
            className="relative"
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDestOpen((v) => !v)}
              className={`flex items-center gap-1 font-medium transition-colors hover:text-primary ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Study in Destination
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  destOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-3 w-[720px] max-w-[90vw] rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-200 ${
                destOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-6">
                {destinations.map((d, i) => (
                  <Link
                    key={d.path}
                    to={d.path}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={`https://flagcdn.com/w40/${d.flag}.png`}
                      alt={d.name}
                      className="w-6 h-4 rounded-sm shadow-sm"
                      loading="lazy"
                      decoding="async"
                      fetchPriority={i < 2 ? "high" : "low"}
                    />
                    <span className="text-gray-800 group-hover:text-primary font-medium">
                      {d.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Remaining nav links */}
          {navLinks.slice(2).map((link) =>
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noreferrer"
                className={`font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${linkColor(
                  link.path
                )}`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden relative z-20 flex items-center justify-center
    transition-all duration-300 ease-in-out
    ${isOpen || isScrolled ? "text-black bg-white" : "text-black "}
    hover:bg-primary hover:text-white
    rounded-md font-bold w-12 h-12 `}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={28} strokeWidth={3} />
          ) : (
            <Menu size={40} strokeWidth={4} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-10 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 pt-28 pb-8 space-y-4">
          <Link
            to="/"
            className={`block text-lg font-medium py-2 transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-gray-800"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className={`block text-lg font-medium py-2 transition-colors hover:text-primary ${
              location.pathname === "/about-us"
                ? "text-primary"
                : "text-gray-800"
            }`}
          >
            About Us
          </Link>

          {/* Study in Destination Accordion */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 font-semibold text-gray-800"
              onClick={() => setMobileDestOpen((v) => !v)}
            >
              Study in Destination
              {mobileDestOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                mobileDestOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-3 space-y-3">
                  {destinations.map((d, i) => (
                    <Link
                      key={d.path}
                      to={d.path}
                      className="flex items-center gap-3 py-1.5"
                    >
                      <img
                        src={`https://flagcdn.com/w40/${d.flag}.png`}
                        alt={d.name}
                        className="w-6 h-4 rounded-sm shadow"
                        loading="lazy"
                        decoding="async"
                        fetchPriority={i < 2 ? "high" : "low"}
                      />
                      <span className="text-gray-800">{d.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Remaining mobile links */}
          {navLinks.slice(2).map((link) =>
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noreferrer"
                className="block text-lg font-medium py-2 transition-colors hover:text-primary text-gray-800"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-lg font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default memo(Navbar);
