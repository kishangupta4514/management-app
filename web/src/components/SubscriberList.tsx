import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Subscription {
  $id: string;
  email: string;
}

export function SubscriberList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/subscriptions`);
        setSubscriptions(response.data);
      } catch (error) {
        setError("Failed to fetch subscriptions.");
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-subscriptions">
      <h2 className="text-2xl font-bold mb-4">Subscribed Email Addresses</h2>
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
                  Email Address
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center px-4 py-2">
                    No responses found.
                  </td>
                </tr>
              ) : (
                subscriptions.map((response) => (
                  <tr key={response.$id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">
                      {response.email}
                    </td>
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
