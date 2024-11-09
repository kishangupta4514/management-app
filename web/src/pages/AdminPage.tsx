import { Link } from "react-router-dom";
import { ProjectManagement } from "../components/ProjectManagement";
import { ClientManagement } from "../components/ClientManagement";
import { SubscriberList } from "../components/SubscriberList";
import { ContactFormManagement } from "../components/ContactFormManagement";
import { useAuth } from "../auth/AuthProvider";
// import { AdminLogin } from "../components/Login";

export function AdminPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 mt-10 p-5">
        {/* <AdminLogin /> */}
        <div className="pb-16">
          <ProjectManagement />
        </div>
        <div className="pb-16">
          <ClientManagement />
        </div>
        <div className="pb-16">
          <ContactFormManagement />
        </div>
        <div className="pb-16">
          <SubscriberList />
        </div>
      </div>
    </div>
  );
}
export function Navbar() {
  const auth = useAuth();
  return (
    <div className="flex justify-between px-32 tracking-tight py-1">
      <Link to="/" className="py-2">
        <img src="/icons/logo.svg" className="w-auto h-10" />
      </Link>
      <div className="flex gap-10 items-center">
        <div>
          <Link to="/" className="uppercase hover:opacity-70 font-[500]">
            Home
          </Link>
        </div>
        {!auth || !auth.token ? (
          <div>
            <Link
              to="/login"
              className="uppercase font-[500] bg-[#f46d21] text-white px-6 py-2 rounded-md hover:opacity-70"
            >
              Login
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
