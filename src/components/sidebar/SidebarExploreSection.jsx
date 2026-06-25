import { Flame, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarExploreSection = ({ linkStyle }) => {
  return (
    <div className="border-b border-[#3f3f3f] py-3">
      <h2 className="px-3 py-2 font-medium text-white">Settings</h2>
      <NavLink to="/settings" className={linkStyle}>
        <Settings size={22} />
        Settings
      </NavLink>
    </div>
  );
};

export default SidebarExploreSection;
