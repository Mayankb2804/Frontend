import { useState, useRef, useEffect } from "react";
import { UserRound } from "lucide-react";
import { useUser } from "../../context/UserContext";
import LogoutButton from "./LogoutButton";

const UserProfile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#272727] transition-opacity hover:opacity-80"
        aria-label="User menu"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <UserRound size={20} className="text-white" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-[#3f3f3f] bg-[#212121] py-2 shadow-xl">
          {/* User info */}
          <div className="flex items-center gap-3 border-b border-[#3f3f3f] px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3f3f3f]">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <UserRound size={20} className="text-white" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user?.fullname || user?.username}
              </p>
              {user?.username && (
                <p className="truncate text-xs text-[#aaa]">@{user.username}</p>
              )}
            </div>
          </div>

          {/* Logout */}
          <div className="px-1 pt-1">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
