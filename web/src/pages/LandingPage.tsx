import { useEffect, useState } from "react";
import { ContactUs } from "../components/ContactUs";
import { Navbar } from "../components/Navbar";
import { ProjectCard } from "../components/ProjectCard";
import { ClientCard } from "../components/ClientCard";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface IProjectData {
  $id: string;
  name: string;
  description: string;
  imgUrl: string;
  location: string;
}

interface IClientData {
  $id: string;
  name: string;
  description: string;
  designation: string;
  imgUrl: string;
}

export function LandingPage() {
  const [clientsData, setClientsData] = useState<IClientData[]>([]);
  const [propertyData, setProperyData] = useState<IProjectData[]>([]);
  const [email, setEmail] = useState<string>("");

  const fetchClientsData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/clients`);
      if (res.status > 300 || !res.data || !res.data.documents)
        throw new Error();
      console.log("clients", res.data);
      setClientsData(res.data.documents);
    } catch (e) {
      console.log("Error fetching clients data", e);
      alert("Error fetching clients data");
    }
    setProperyData(propertyData);
  };

  const fetchProjectsData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/projects`);
      if (res.status > 300 || !res.data || !res.data.documents)
        throw new Error();
      console.log("projects", res.data);
      setProperyData(res.data.documents);
    } catch (e) {
      console.log("Error fetching projects data", e);
      alert("Error fetching projects data");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/subscribe`, {
        email,
      });
      alert("Subscribed...");
      setEmail("");
    } catch (error) {
      alert("Failed to subscribe...");
      console.error("Error subscribing:", error);
    }
  };

  useEffect(() => {
    fetchClientsData();
    fetchProjectsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="relative overflow-hidden w-full h-full">
          <div className="">
            <div className="top-[40%] left-[20%] text-7xl text-white font-bold absolute z-10">
              <div className="">Consultation,</div>
              <div className="">Design,</div>
              <div className="">& Marketing</div>
            </div>
            <div className="absolute top-[10%] right-[10%] z-10">
              <ContactUs />
            </div>
            <img
              //   className="absolute top-0 -z-10"
              loading="lazy"
              alt="young-couple"
              src="./icons/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex">
            <div className="relative w-full h-full min-h-[500px] flex justify-center items-center">
              <div className="px-20">
                <div className="text-sky-700 text-3xl font-bold py-2">
                  Not Your Average Realtor
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, voluptas consequatur vitae autem quis corrupti
                  fugit repellendus, officia est minima saepe repudiandae
                  reiciendis numquam in reprehenderit earum itaque eaque
                  quibusdam.
                </div>
              </div>
              <div>
                <div className="absolute w-[750px] left-[10%] top-[10%]">
                  <img
                    loading="lazy"
                    src="/shapes/Ellipse 20.svg"
                    className=""
                  />
                </div>
                <div className="absolute left-[5%] top-[70%]">
                  <img
                    loading="lazy"
                    src="/shapes/Ellipse 23.svg"
                    className="h-[500px]"
                  />
                </div>
                <div className="absolute w-[300px] left-[5%] top-[110%]">
                  <img loading="lazy" src="/shapes/Group 1.svg" className="" />
                </div>
              </div>
            </div>
            <div className="relative w-full h-full min-h-[300px]">
              <div className="relative w-full h-full min-h-[300px] pt-10">
                <div className="absolute w-[300px] right-[2.5%]">
                  <img loading="lazy" src="/icons/couple-with-keys.svg" />
                </div>
                <div className="absolute w-[380px]  right-[45%] top-[48%]">
                  <img loading="lazy" src="/icons/person-with-home.svg" />
                </div>
                <div className="absolute w-[300px] right-[6%] top-[118%]">
                  <img loading="lazy" src="/icons/person-with-paper.svg" />
                </div>
              </div>
              <div className="absolute w-[750px] right-[6%] -top-[20%] -rotate-[30deg]">
                <img loading="lazy" src="/shapes/Ellipse 7.svg" className="" />
              </div>
              <div className="absolute -left-[2%] top-[25%] -rotate-[30deg]">
                <img loading="lazy" src="/shapes/Ellipse 24.svg" className="" />
              </div>
              <div className="absolute w-[750px] right-[11%] -bottom-[30%] -rotate-[30deg]">
                <img loading="lazy" src="/shapes/Ellipse 25.svg" className="" />
              </div>
              <div className="absolute w-[750px] -right-[30%] -bottom-[114%] -rotate-[30deg]">
                <img loading="lazy" src="/shapes/Ellipse 26.svg" className="" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col w-full h-full items-center mt-[300px]">
              <div className="text-3xl font-bold text-sky-700">
                Why Choose Us?
              </div>
              <div className="w-36 h-1 bg-sky-700 mt-5" />
              <div className="w-full h-full flex items-center mt-5 justify-center gap-5 px-20">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <img loading="lazy" src="/shapes/Ellipse 10.svg" />
                    <div className="absolute top-1/4 right-1/4">
                      <img loading="lazy" src="images/home.svg" />
                    </div>
                  </div>
                  <div className="text-sky-700 text-2xl font-bold mt-5">
                    Potential ROI
                  </div>
                  <div className="mt-5">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Obcaecati voluptatibus dolorem ut doloribus. Corrupti at
                    laudantium corrupti reprehenderit.
                  </div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <img loading="lazy" src="/shapes/Ellipse 10.svg" />
                    <div className="absolute top-1/4 right-1/4">
                      <img loading="lazy" src="images/paintbrush-2.svg" />
                    </div>
                  </div>
                  <div className="text-sky-700 text-2xl font-bold mt-5">
                    Design
                  </div>
                  <div className="mt-5">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Obcaecati voluptatibus dolorem ut doloribus. Corrupti at
                    laudantium corrupti reprehenderit.
                  </div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative ">
                    <img loading="lazy" src="/shapes/Ellipse 10.svg" />
                    <div className="absolute top-1/4 right-1/4">
                      <img loading="lazy" src="images/circle-dollar-sign.svg" />
                    </div>
                  </div>
                  <div className="text-sky-700 text-2xl font-bold mt-5 ">
                    Marketing
                  </div>
                  <div className="mt-5 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Obcaecati voluptatibus dolorem ut doloribus. Corrupti at
                    laudantium corrupti reprehenderit qui nam.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="pr-36">
              <img
                loading="lazy"
                src="/shapes/Subtract-1.svg"
                className="ml-auto"
              />
            </div>
            <div className="relative scale-75 -left-48 h-[1100px] -top-[130px]">
              <div className="pr-20 mt-5 absolute -right-[450px]">
                <img
                  loading="lazy"
                  src="/shapes/Group 1000001645.svg"
                  className="ml-auto"
                />
              </div>
              <div className="absolute left-[14%]">
                <img
                  loading="lazy"
                  src="/shapes/Subtract-2.svg"
                  className="w-[80px]"
                />
              </div>
              <div className="absolute left-[9%] top-[400px]">
                <img loading="lazy" src="/shapes/Ellipse 10.svg" />
              </div>
              <div className="absolute left-[4%] top-[550px]">
                <img loading="lazy" src="/shapes/Ellipse 17.svg" />
              </div>
              <div className="absolute left-0 top-[620px]">
                <img loading="lazy" src="/shapes/Ellipse 22.svg" />
              </div>
              <div className="absolute left-[30%] top-[200px]">
                <img
                  loading="lazy"
                  src="/icons/pexels-brett-sayles-2881232.svg"
                />
              </div>
              <div className="absolute left-[28%] top-[405px]">
                <img loading="lazy" src="/shapes/Subtract-4.svg" />
              </div>
              <div className="absolute left-[32%] top-[650px]">
                <img loading="lazy" src="/shapes/Rectangle 55.svg" />
              </div>
              <div className="absolute left-[49%] top-[180px]">
                <img loading="lazy" src="/shapes/Rectangle 54.svg" />
              </div>
              <div className="absolute left-[52%] top-[360px]">
                <img
                  loading="lazy"
                  src="/icons/pexels-andres-ayrton-6578391.svg"
                />
              </div>
              <div className="absolute left-[47%] top-[500px]">
                <img loading="lazy" src="/shapes/Rectangle 57.svg" />
              </div>
              <div className="absolute left-[83%] top-[270px]">
                <img loading="lazy" src="/shapes/Subtract.svg" />
              </div>
              <div className="absolute -right-[150px] top-[560px]">
                <img loading="lazy" src="/icons/pexels-fauxels-3182834.svg" />
              </div>
              <div className="absolute -right-[170px] top-[795px]">
                <img loading="lazy" src="/shapes/Subtract-5.svg" />
              </div>
              <div className="absolute -right-[450px] top-[350px]">
                <img loading="lazy" src="/shapes/Ellipse 17.svg" />
              </div>
              <div className="absolute -right-[550px] top-[480px]">
                <img loading="lazy" src="/shapes/Ellipse 18.svg" />
              </div>
              <div className="absolute -right-[300px] top-[900px]">
                <img loading="lazy" src="/shapes/Ellipse 10.svg" />
              </div>
            </div>
            <div className="relative -top-[300px]">
              <div className="absolute right-10">
                <img src="/shapes/Subtract-2.svg" loading="lazy" />
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-sky-700">About Us</div>
                <div className="mt-5 w-24 h-1 bg-sky-700 rounded-lg" />
                <div className="text-center px-96 mt-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati id minima consequatur inventore unde eveniet nihil,
                  eaque atque, fugiat porro officia vitae. Provident sint
                  commodi sequi aut, tempore quia in! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dolores, odit commodi sit saepe
                  voluptatem minus dolorem voluptas quae pariatur debitis sint
                  error dignissimos minima numquam deleniti corrupti repellat
                  aliquid aspernatur?
                </div>
              </div>
              <div className="text-center mt-10">
                <button className="mx-auto border-[1px] border-sky-700 rounded-md px-20  shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px] py-2 shadow-sky-700 shadow-b-2">
                  Learn More
                </button>
              </div>
              <div className="absolute left-20">
                <img loading="lazy" src="/shapes/Subtract-2.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#f8fbff] flex items-center flex-col py-20">
          <div className="text-2xl font-bold text-sky-700">Our Projects</div>
          <div className="mt-5 px-96 text-center">
            We know what buyers are looking for and suggest projects that will
            brging clients top dollar for the sale of their homes.
          </div>
          <div className="flex w-full gap-5 flex-wrap ml-20 mt-10">
            {propertyData.map((data) => (
              <ProjectCard data={data} key={data.$id} />
            ))}
          </div>
        </div>
        <div className="flex w-full h-full items-center flex-col py-28">
          <div></div>
          <div className="text-3xl font-bold text-sky-700">Happy Clients</div>
          <div className="mt-16 flex gap-1 flex-wrap">
            {clientsData.map((data) => (
              <ClientCard data={data} key={data.$id} />
            ))}
          </div>
        </div>
        <div className="relative mt-28">
          <div className="relative">
            <div className="absolute w-full h-full bg-black bg-opacity-50">
              <div className="w-[600px] mx-auto text-center text-2xl font-bold text-white mt-24">
                Learn more about our listing process, as well as our additional
                staging and design work.
              </div>
              <div className="text-center mt-16">
                <button className="bg-white text-sky-500 rounded-lg mx-auto px-28 py-2 font-bold border-[1px] border-solid border-sky-500">
                  Learn More
                </button>
              </div>
            </div>
            <img loading="lazy" className="" src="/icons/Rectangle.svg" />
          </div>
          <div className="w-full h-[100px] bg-blue-500 text-white flex justify-between px-28 items-center">
            <div>Home</div>
            <div>Services</div>
            <div>Projects</div>
            <div>Testimonials</div>
            <div>Contact</div>
            <div className="ml-32">Subscribe Us</div>
            <form
              onSubmit={handleSubscribe}
              className=" border-2 border-white rounded-md"
            >
              <input
                name="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder-white outline-none text-white bg-inherit px-8"
              />
              <span>
                <button
                  className="bg-white text-sky-500 h-full p-2 px-8"
                  type="submit"
                >
                  Subscribe
                </button>
              </span>
            </form>
          </div>
          <div className="w-full h-[100px] bg-[#21202e] flex justify-between px-28 text-white items-center">
            <div>All Rights Reserved 2024</div>
            <div>
              <img loading="lazy" src="/icons/logo.svg" className="h-[40px]" />
            </div>
            <div className="flex gap-2">
              <div className="rounded-full p-1 bg-white text-center m-auto w-[30px] h-[30px]">
                <img
                  loading="lazy"
                  src="/images/Group-1.svg"
                  width={30}
                  height={30}
                />
              </div>
              <div className="rounded-full p-1 bg-white w-[30px] h-[30px]">
                <img
                  loading="lazy"
                  src="/images/Group.svg"
                  width={30}
                  height={30}
                />
              </div>
              <div className="rounded-full p-1 bg-white">
                <img loading="lazy" src="/images/Frame.svg" />
              </div>
              <div className="rounded-full p-1 bg-white">
                <img loading="lazy" src="/images/Linkedin.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
