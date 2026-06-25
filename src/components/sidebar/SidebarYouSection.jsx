import { History, ListVideo, Clock3, ThumbsUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarYouSection = ({ linkStyle }) => {
  return (
    <div className="border-b border-[#3f3f3f] py-3">
      <h2 className="px-3 py-2 font-medium text-white">You</h2>

      <NavLink to="/history" className={linkStyle}>
        <History size={22} />
        History
      </NavLink>

      <NavLink to="/playlists" className={linkStyle}>
        <ListVideo size={22} />
        Playlists
      </NavLink>

      <NavLink to="/liked" className={linkStyle}>
        <ThumbsUp size={22} />
        Liked videos
      </NavLink>
    </div>
  );
};

export default SidebarYouSection;
