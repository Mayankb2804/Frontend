import { useState } from "react";
import { Menu } from "lucide-react";
import YoutubeLogo from "./YoutubeLogo";
import Sidebar from "../sidebar/Sidebar";
import { useUser } from "../../context/UserContext";
const MenuBtn = () => {
  const {menuOpen, setMenuOpen} = useUser();
  return (
    <div>
    <div className="flex h-full shrink-0 items-center">
      <div className="flex h-full items-center">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-[#272727]"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <YoutubeLogo />
      </div>
      {menuOpen && <Sidebar onClose={() => setMenuOpen(false)} />}  
    </div>
    </div>
  );
};

export default MenuBtn;
