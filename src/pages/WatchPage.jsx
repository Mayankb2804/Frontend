import PageWrapper from "../components/shared/PageWrapper"
import VideoRow from "../components/shared/VideoRow"

const RECOMMENDED = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Recommended Video Title ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 1}K views`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
}))

const COMMENTS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  user: `@user${i + 1}`,
  time: `${i + 1} day${i > 0 ? "s" : ""} ago`,
  likes: Math.floor(Math.random() * 200),
}))

const WatchPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-[1400px] mx-auto px-4 py-6 flex flex-col xl:flex-row gap-6">

        {/* ── Left: Player + Info ── */}
        <div className="flex-1 min-w-0">

          {/* Player */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-white/30">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-4xl">▶</div>
                <p className="text-sm">Video Player</p>
              </div>
            </div>
          </div>

          {/* Title + actions */}
          <h1 className="text-white text-lg font-semibold mb-2 leading-snug">
            Video Title — Full Episode or Tutorial Name Goes Here
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <p className="text-[#aaa] text-sm">1.2M views · 3 months ago</p>
            <div className="flex items-center gap-2 flex-wrap">
              {[["👍", "24K"], ["👎", ""], ["↗", "Share"], ["+", "Save"], ["⋯", ""]].map(([icon, label], i) => (
                <button key={i} className="flex items-center gap-1.5 bg-[#272727] hover:bg-[#3f3f3f] text-white text-sm px-4 py-2 rounded-full transition-colors border-none cursor-pointer">
                  {icon}{label && <span>{label}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e24b4a] flex items-center justify-center text-white font-bold shrink-0">C</div>
              <div>
                <p className="text-white text-sm font-medium">Channel Name</p>
                <p className="text-[#aaa] text-xs">842K subscribers</p>
              </div>
            </div>
            <button className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full border-none cursor-pointer hover:bg-[#e0e0e0] transition-colors">
              Subscribe
            </button>
          </div>

          {/* Description */}
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6 cursor-pointer">
            <p className="text-white text-sm font-medium mb-1">1.2M views · 3 months ago · #Tutorial #JavaScript #React</p>
            <p className="text-[#aaa] text-sm line-clamp-2">
              This is the video description. It contains details about the content, links, timestamps, and other relevant information.
            </p>
            <button className="text-white text-sm font-medium mt-2 bg-transparent border-none cursor-pointer">...more</button>
          </div>

          {/* Comments */}
          <div>
            <h2 className="text-white font-medium mb-5">128 Comments</h2>
            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#3ea6ff] shrink-0 flex items-center justify-center text-black font-bold text-sm">U</div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-transparent border-b border-[#333] text-white text-sm py-2 outline-none placeholder:text-[#555] focus:border-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-5">
              {COMMENTS.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#272727] shrink-0 flex items-center justify-center text-white text-sm font-medium">
                    {c.user[1].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white text-sm font-medium">{c.user}</p>
                      <p className="text-[#aaa] text-xs">{c.time}</p>
                    </div>
                    <p className="text-[#e0e0e0] text-sm">Great video, really helpful content! 👏</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="text-[#aaa] text-xs flex items-center gap-1 bg-transparent border-none cursor-pointer hover:text-white">👍 {c.likes}</button>
                      <button className="text-[#aaa] text-xs bg-transparent border-none cursor-pointer hover:text-white">👎</button>
                      <button className="text-[#aaa] text-xs bg-transparent border-none cursor-pointer hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Recommended ── */}
        <div className="w-full xl:w-96 shrink-0">
          <div className="flex flex-col gap-1">
            {RECOMMENDED.map((v) => (
              <VideoRow key={v.id} {...v} thumbWidth="w-40" />
            ))}
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}

export default WatchPage
