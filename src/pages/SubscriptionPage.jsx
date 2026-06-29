import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import VideoCard from "../components/shared/VideoCard"

const CHANNELS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  letter: String.fromCharCode(65 + (i % 26)),
  live: i % 3 === 0,
}))

const VIDEOS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Latest Upload from Subscription ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 1}K views`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  avatar: String.fromCharCode(65 + (i % 26)),
  avatarBg: "bg-gradient-to-br from-[#e24b4a] to-[#ff6b6b]",
  badge: i % 4 === 0
    ? <span className="bg-[#e24b4a] text-white text-xs px-2 py-0.5 rounded font-medium">NEW</span>
    : null,
}))

const SubscriptionPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Subscriptions"
          subtitle={`${CHANNELS.length} channels`}
          action={
            <button className="text-sm text-[#3ea6ff] hover:underline bg-transparent border-none cursor-pointer">
              Manage
            </button>
          }
        />

        {/* Channel avatars row */}
        <div className="flex gap-6 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {CHANNELS.map((ch) => (
            <div key={ch.id} className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e24b4a] to-[#ff6b6b] flex items-center justify-center text-white font-bold text-lg border-2 border-transparent group-hover:border-[#e24b4a] transition-all">
                  {ch.letter}
                </div>
                {ch.live && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f0f]" />
                )}
              </div>
              <p className="text-[#aaa] text-xs text-center w-14 truncate group-hover:text-white transition-colors">
                Channel {ch.id + 1}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-4">Latest</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default SubscriptionPage
