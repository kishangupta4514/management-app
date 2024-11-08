import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <div className="flex justify-between px-32 tracking-tight">
      <Link to="/home" className="py-2">
        <img src="/icons/logo.svg" className="w-auto h-10" />
      </Link>
      <div className="flex gap-10 items-center">
        <div>
          <Link to="/home" className="uppercase hover:opacity-70 font-[500]">
            Home
          </Link>
        </div>
        <div>
          <Link
            to="/services"
            className="uppercase hover:opacity-70 font-[500]"
          >
            Services
          </Link>
        </div>
        <div>
          <Link
            to="/projects"
            className="uppercase hover:opacity-70 font-[500]"
          >
            About Projects
          </Link>
        </div>
        <div>
          <Link
            to="/testimonials"
            className="uppercase hover:opacity-70 font-[500]"
          >
            Testimonials
          </Link>
        </div>
        <div>
          <Link
            to="/contact"
            className="uppercase font-[500] bg-[#f46d21] text-white px-6 py-2 rounded-md hover:opacity-70"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
