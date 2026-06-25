import { UserRound } from "lucide-react";
import SignIn from "../user/SignIn";

const SidebarUserSection = ({ user }) => {
  return (
    <div className="border-b border-[#3f3f3f]">
      {user ? (
        <div className="flex items-center gap-3 px-3 py-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username || "Profile"}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <UserRound size={24} className="text-white" />
          )}
          <div>
            <p className="text-sm font-medium text-white">{user.fullname || user.username}</p>
            {user.username && (
              <p className="text-xs text-[#aaa]">@{user.username}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="px-3 py-4">
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default SidebarUserSection;
