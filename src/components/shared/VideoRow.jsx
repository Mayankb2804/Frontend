/**
 * VideoRow — horizontal list row with thumbnail on left, info on right.
 * Used in: HistoryPage, WatchPage (recommended), SearchPage
 *
 * Props:
 *   title        string
 *   channel      string
 *   views        string
 *   duration     string
 *   thumbWidth   string  (tailwind w-* class, default "w-40")
 *   onRemove     fn      (optional — shows ✕ button on hover)
 *   onClick      fn
 *   extra        node    (optional extra info below channel, e.g. description)
 */
const VideoRow = ({
  title = "Video Title",
  channel = "Channel",
  views = "0 views",
  duration = "0:00",
  thumbWidth = "w-40",
  onRemove,
  onClick,
  extra = null,
}) => {
  return (
    <div
      className="flex gap-4 group cursor-pointer p-2 rounded-xl hover:bg-[#1a1a1a] transition-colors"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className={`relative shrink-0 ${thumbWidth} aspect-video rounded-lg overflow-hidden bg-[#272727]`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-1 flex-1 min-w-0 py-1">
        <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#ccc] transition-colors">
          {title}
        </p>
        <p className="text-[#aaa] text-xs">{channel}</p>
        <p className="text-[#aaa] text-xs">{views}</p>
        {extra}
      </div>

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="text-[#555] hover:text-white text-lg self-start mt-1 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default VideoRow
