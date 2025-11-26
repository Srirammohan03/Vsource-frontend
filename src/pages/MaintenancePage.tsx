import { motion, useAnimation } from "framer-motion";
import { Wrench, Clock } from "lucide-react";
import DelayedPopup from "@/components/DelayedPopup";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const MaintenancePage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [backdropVisible, setBackdropVisible] = useState(true);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const options = ["Masters in abroad", "Education Loan Guidance"];
  // Animate form entrance
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    });
  }, [controls]);

  // Compute animation target (form -> icon)
  const animateToIconAndClose = async () => {
    const card = cardRef.current;
    const anchor = document.getElementById("form-icon-anchor");

    if (!card || !anchor) {
      // Fallback: just fade out if anchor missing
      await controls.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.25 },
      });
      setBackdropVisible(false);

      return;
    }

    const cardRect = card.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();

    // Centers
    const cardCx = cardRect.left + cardRect.width / 2;
    const cardCy = cardRect.top + cardRect.height / 2;
    const anchorCx = anchorRect.left + anchorRect.width / 2;
    const anchorCy = anchorRect.top + anchorRect.height / 2;

    const dx = anchorCx - cardCx;
    const dy = anchorCy - cardCy;

    // Animate the card shrinking & moving into the icon position
    await controls.start({
      x: dx,
      y: dy,
      scale: 0.1,
      opacity: 0.9,
      borderRadius: "999px",
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    });

    // Fade out backdrop after the card lands in the icon spot
    setBackdropVisible(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (phoneNumber.length < 10 || name.trim().length === 0) {
      alert("Please enter your name and a valid phone number.");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    const payload = {
      data: {
        student_name: name,
        number: phoneNumber,
        service_required: selectedOption,
      },
    };

    try {
      const { status } = await axios.post(
        `${import.meta.env.VITE_CMS_GLOBALURL}/api/enquires`,
        payload
      );
      if (status === 200 || status === 201) {
        toast.success("Submitted successfully!");
        animateToIconAndClose();
        setName("");
        setPhoneNumber("");
        setSelectedOption("");
      }
    } catch (error) {
      console.error("failed to submit data", error);
      toast.error("failed to submit data");
      return null;
    } finally {
      setLoading(false);
    }
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12 md:py-0 text-center md:text-left">
      {/* LEFT SIDE — Maintenance Message */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col justify-center items-center md:items-start md:pr-10"
      >
        <Wrench className="w-20 h-20 animate-bounce text-red-600 mb-6" />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          We're Under Maintenance
        </h1>

        <p className="text-gray-600 max-w-lg mb-8 text-lg">
          We're making improvements to serve you better. Please check back soon!
          Meanwhile, you can share your details and our team will reach out to
          you once we're back online.
        </p>

        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-5 h-5" />
          <span>Expected to be back shortly</span>
        </div>
      </motion.div>

      {/* RIGHT SIDE — The Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center items-center mt-10 md:mt-0 w-full"
      >
        {/* Remove backdrop and minimize logic, just render the form inline */}
        <div className="w-full max-w-md">
          {/* <DelayedPopup onMinimize={() => {}} /> */}
          <div className="bg-white p-6 text-gray-800 rounded-2xl">
            {/* Header */}
            {/* Header */}
            <div className="bg-red-500 text-white md:py-6 md:px-6 md:-mx-6 md:-mt-6 mb-6 py-3 px-3 -mx-3  -mt-3 text-center relative rounded-t-2xl space-y-1">
              <h2 className="text-2xl font-bold tracking-wide">STUDY IN UK</h2>

              <p className=" font-medium">TOP UNIVERSITIES • LOW PACKAGES</p>

              <p className="text-xl font-medium">
                APPLY NOW FOR JAN 2026 INTAKE
              </p>

              {/* Close button */}
              {/* <button
                onClick={animateToIconAndClose}
                className="absolute top-4 right-4 text-white hover:text-gray-100 transition"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button> */}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name input */}
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                required
              />

              {/* Phone input */}
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <div className="bg-gray-100 text-gray-700 px-4 py-3 flex items-center font-medium border-r rounded-l-md">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>

              {/* Dropdown */}
              <div className="relative">
                <div
                  className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>{selectedOption || "Select Service Required"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {showDropdown && (
                  <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition duration-150 shadow-md"
              >
                {loading ? "Submitting..." : "Request Callback"}
              </button>
            </form>

            {/* Footer */}
            <div className="bg-red-500 text-white  md:-mb-6 md:-mx-6 md:p-6 md:mt-3 -mb-3 -mx-3 mt-2 p-3 text-center relative rounded-b-2xl space-y-1">
              <span className="text-xl font-medium ">
                100% LOAN ASSISTANCE FROM DIFFERENT GOVERNMENT AND PRIVATE BANKS
                FOR ACCOMMODATION AND COURSE FEES
              </span>

              <span className="text-xl font-medium    ">
                ACCOMMODATION SUPPORT IN ABROAD
              </span>

              <span className="text-xl font-medium    ">
                COMPLETE GUIDANCE TILL VISA
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
