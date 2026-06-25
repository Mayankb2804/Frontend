import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      {/* Sidebar is rendered inside MenuBtn when hamburger is clicked */}
      <Outlet />
    </div>
  );
};

export default Layout;
