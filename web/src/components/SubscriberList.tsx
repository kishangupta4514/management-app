import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export function SubscriberList() {
  const [subscribers, setSubscribers] = useState<[{ email: string }] | null>(
    null
  );

  useEffect(() => {
    const fetchSubscribers = async () => {
      const response = await axios.get(`${apiUrl}/`);
      if(response.status !== 200) return;
      console.log(response.status)
      setSubscribers(response.data);
    };
    fetchSubscribers();
  }, []);

  console.log({subscribers})

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold">Subscribers</h2>
      <ul>
        {subscribers &&
          subscribers.map((subscriber, index) => (
            <li key={index} className="border-b py-2">
              {subscriber.email}
            </li>
          ))}
      </ul>
      <h1>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum esse accusamus aliquid itaque! Excepturi vel libero molestiae incidunt et ut! Quis ullam maiores amet doloremque iure officiis laboriosam, quidem odit."</h1>
    </div>
  );
}
