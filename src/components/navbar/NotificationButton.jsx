import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <button
      className="hidden h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-[#272727] sm:flex"
      aria-label="Notifications"
    >
      <Bell size={23} />
    </button>
  );
};

export default NotificationButton;
