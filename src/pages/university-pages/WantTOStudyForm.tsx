import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const WantTOStudyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const options = ["Masters in abroad", "Education Loan Guidance"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Validation
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select a service");
      return;
    }

    setLoading(true);

    const payload = {
      data: {
        student_name: name,
        number: phone,
        service_required: selectedOption,
      },
    };

    try {
      const { status } = await axios.post(
        `https://backend.vsourceoverseas.com/api/enquires`,
        payload
      );
      if (status === 200 || status === 201) {
        toast.success("Submitted successfully!");
        // Reset form
        setName("");
        setPhone("");
        setSelectedOption("");
      } else {
        toast.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-7 space-y-4">
      {/* Name */}
      <div className="space-y-1">
        <Label>
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Mobile */}
      <div className="space-y-1">
        <Label>
          Mobile <span className="text-red-500">*</span>
        </Label>
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={setPhone}
          countryCodeEditable={false}
          disableCountryCode={false}
          inputProps={{
            required: true,
            name: "phone",
            className:
              "w-full rounded-md py-2 px-3 pl-12 focus:ring-2 focus:ring-blue-400 outline-none border",
          }}
        />
      </div>

      {/* Service Dropdown */}
      <div className="space-y-1 relative">
        <Label>
          Service Required <span className="text-red-500">*</span>
        </Label>
        <div
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 flex justify-between items-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>{selectedOption || "Select Service"}</span>
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
      <Button
        type="submit"
        className="w-full py-2 rounded-lg font-semibold text-white shadow-md bg-gradient-to-r from-orange-400 to-red-500 hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default WantTOStudyForm;
