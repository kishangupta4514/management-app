import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface IUserData {
  fullName: string;
  email: string;
  mobile: number | null;
  location: string;
}

export function ContactUs() {
  const [userData, setUserData] = useState<IUserData>({
    fullName: "",
    email: "",
    mobile: null,
    location: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        `${apiUrl}/contact-form`,
        userData
      );
      if (response.status !== 201) throw new Error();
      setSuccessMessage("Your response has been recorded successfully!");
      setUserData({
        fullName: "",
        email: "",
        mobile: null,
        location: "",
      }); // Reset form after submission
    } catch (error) {
      setError("Failed to submit your contact form. Please try again.");
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="flex flex-col items-center bg-[#52608d] w-[400px] gap-5 pt-8 pb-10 shadow-sm bg-opacity-90 border-2 border-white rounded-sm">
      <div className="text-white text-center my-2 mx-auto text-3xl font-bold">
        <div>Get a Free </div>
        <div>Consultation </div>
      </div>
      <div>
        <form
          className="flex flex-col gap-6 text-white"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-transparent border-[1px] border-white rounded-md p-3 mx-auto placeholder-white w-80 outline-none"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                fullName: e.target.value,
              }))
            }
          />
          <input
            className="bg-transparent border-[1px] border-white rounded-md p-3 mx-auto placeholder-white w-80 outline-none"
            placeholder="Email Address"
            value={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <input
            className="bg-transparent border-[1px] border-white rounded-md p-3 mx-auto placeholder-white w-80 outline-none"
            placeholder="Mobile Number"
            value={userData.mobile ?? ""}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                mobile: parseInt(e.target.value),
              }))
            }
          />
          <input
            className="bg-transparent border-[1px] border-white rounded-md p-3 mx-auto placeholder-white w-80 outline-none"
            placeholder="Area, City"
            value={userData.location}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />
          {error && <p className="text-red-500 mx-auto -my-2 -mb-6">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mx-auto -my-2 -mb-6">{successMessage}</p>
          )}
          <button
            type="submit"
            className="mt-6 mx-auto uppercase font-[500] bg-[#f46d21] text-white px-24 py-3 rounded-md hover:opacity-70"
            disabled={loading}
          >
            {loading ? "Sending..." : "Get Quick Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}
