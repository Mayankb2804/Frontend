import { Home, Clapperboard, PlaySquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarNavSection = ({ linkStyle }) => {
  return (
    <div className="border-b border-[#3f3f3f] pb-3">
      <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? "bg-[#272727] font-medium" : ""}`}>
        <Home size={22} />
        Home
      </NavLink>

      <NavLink to="/subscriptions" className={({ isActive }) => `${linkStyle} ${isActive ? "bg-[#272727] font-medium" : ""}`}>
        <PlaySquare size={22} />
        Subscriptions
      </NavLink>
    </div>
  );
};

export default SidebarNavSection;
