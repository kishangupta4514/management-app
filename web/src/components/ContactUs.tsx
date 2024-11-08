import { useState, useEffect } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            className=" bg-transparent border-[1px] border-white rounded-md p-3 placeholder-white w-80 outline-none"
            placeholder="Full Name"
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, fullName: e.target.value };
              })
            }
          />
          <input
            className=" bg-transparent border-[1px] border-white rounded-md p-3 placeholder-white w-80 outline-none"
            placeholder="Email Address"
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <input
            className=" bg-transparent border-[1px] border-white rounded-md p-3 placeholder-white w-80 outline-none"
            placeholder="Mobile Number"
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, mobile: parseInt(e.target.value) };
              })
            }
          />
          <input
            className=" bg-transparent border-[1px] border-white rounded-md p-3 placeholder-white w-80 outline-none"
            placeholder="Area, City"
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, location: e.target.value };
              })
            }
          />
          <button
            type="submit"
            className="mt-6 uppercase font-[500] bg-[#f46d21] text-white px-auto py-3 rounded-md hover:opacity-70"
          >
            Get Quick Quote
          </button>
        </form>
      </div>
    </div>
  );
}
