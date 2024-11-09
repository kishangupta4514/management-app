import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface IContactFormResponse {
  $id: string;
  fullName: string;
  email: string;
  mobile: string;
  location: string;
}

export function ContactFormManagement() {
  const [contactFormResponses, setContactFormResponses] = useState<
    IContactFormResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch contact form responses when the component mounts
    fetchContactFormResponses();
  }, []);

  const fetchContactFormResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/contact-form`);
      setContactFormResponses(response.data.documents || []);
    } catch (err) {
      setError("Failed to fetch contact form responses.");
      console.error("Error fetching contact form responses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2 className="text-2xl font-bold mb-4">Contact Form Responses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Full Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Email Address
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Mobile Number
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {contactFormResponses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center px-4 py-2">
                    No responses found.
                  </td>
                </tr>
              ) : (
                contactFormResponses.map((response) => (
                  <tr key={response.$id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">
                      {response.fullName}
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {response.email}
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {response.mobile}
                    </td>
                    <td className="px-4 py-2 text-gray-800">{response.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
