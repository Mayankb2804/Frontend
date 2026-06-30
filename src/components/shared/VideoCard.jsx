import { NavLink } from "react-router-dom"

/**
 * VideoCard — grid card with thumbnail, channel avatar, title, meta.
 * Used in: HomePage, LikedPage, SubscriptionPage
 *
 * Props:
 *   title      string
 *   channel    string
 *   views      string
 *   duration   string
 *   avatar     string  (single letter fallback)
 *   badge      node    (optional overlay badge e.g. 👍 or NEW)
 *   avatarBg   string  (tailwind bg class, default bg-[#e24b4a])
 *   onClick    fn
 */
const VideoCard = ({
  video_id = "id",
  title = "Video Title",
  channel = "Channel",
  views = "0 views",
  duration = "0:00",
  avatar = "A",
  badge = null,
  avatarBg = "bg-[#e24b4a]",
  onClick,
  thumbnail
}) => {
  return (
    <NavLink to={`/watch/${video_id}`} className="flex flex-col gap-2 cursor-pointer group" onClick={onClick}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-[#272727] rounded-xl overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        )}
        {badge && <div className="absolute top-2 left-2">{badge}</div>}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3">
        <div className={`w-9 h-9 rounded-full ${avatarBg} shrink-0 flex items-center justify-center text-white text-xs font-bold`}>
          {avatar}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#aaa] transition-colors">
            {title}
          </p>
          <p className="text-[#aaa] text-xs">{channel}</p>
          <p className="text-[#aaa] text-xs">{views} views</p>
        </div>
      </div>
    </NavLink>
  )
}

export default VideoCard
