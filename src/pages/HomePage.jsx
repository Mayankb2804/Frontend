import { useState } from "react"
import PageWrapper from "../components/shared/PageWrapper"
import FilterChips from "../components/shared/FilterChips"
import VideoCard from "../components/shared/VideoCard"

const CHIPS = ["All", "Music", "Gaming", "Live", "Mixes", "News", "Podcasts", "React", "JavaScript", "Comedy", "Sports"]

const VIDEOS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `Video Title Goes Here — Episode ${i + 1}`,
  channel: "Channel Name",
  views: `${Math.floor(Math.random() * 900) + 1}K views · ${Math.floor(Math.random() * 11) + 1} months ago`,
  duration: `${Math.floor(Math.random() * 15) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  avatar: String.fromCharCode(65 + (i % 26)),
}))

const HomePage = () => {
  const [activeChip, setActiveChip] = useState("All")

  return (
    <PageWrapper>
      <div className="px-6 py-6">
        <FilterChips chips={CHIPS} active={activeChip} onSelect={setActiveChip} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage
