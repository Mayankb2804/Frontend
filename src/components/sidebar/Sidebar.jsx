import { Menu } from "lucide-react";
import YoutubeLogo from "../navbar/YoutubeLogo";
import SidebarContent from "./SidebarContent";

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] text-white">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 cursor-default bg-black/60"
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div className="relative flex h-full w-[240px] flex-col bg-[#0f0f0f]">
        <div className="flex h-14 shrink-0 items-center px-4">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#272727]"
            aria-label="Close menu"
          >
            <Menu size={24} />
          </button>
          <YoutubeLogo />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <SidebarContent />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
