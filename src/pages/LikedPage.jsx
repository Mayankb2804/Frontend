import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import VideoCard from "../components/shared/VideoCard"

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  title: `Liked Video Title — Entry ${i + 1}`,
  channel: "Channel Name",
  views: `${Math.floor(Math.random() * 900) + 1}K views`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  avatar: String.fromCharCode(65 + (i % 26)),
  avatarBg: "bg-[#3ea6ff]",
  badge: <span className="bg-[#e24b4a]/90 rounded-full px-2 py-0.5 text-white text-xs">👍</span>,
}))

const LikedPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader icon="👍" title="Liked videos" subtitle={`${ITEMS.length} videos`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {ITEMS.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default LikedPage
