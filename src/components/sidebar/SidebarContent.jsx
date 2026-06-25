import { useUser } from "../../context/UserContext";
import SidebarNavSection from "./SidebarNavSection";
import SidebarYouSection from "./SidebarYouSection";
import SidebarUserSection from "./SidebarUserSection";
import SidebarExploreSection from "./SidebarExploreSection";

const SidebarContent = () => {
  const { user } = useUser();

  const linkStyle =
    "flex h-10 w-full items-center gap-6 rounded-lg px-3 text-sm text-white hover:bg-[#272727]";

  return (
    <div className="w-full">
      <SidebarNavSection linkStyle={linkStyle} />
      <SidebarYouSection linkStyle={linkStyle} />
      <SidebarUserSection user={user} />
      <SidebarExploreSection linkStyle={linkStyle} />
    </div>
  );
};

export default SidebarContent;
