import { useState } from "react"
import PageWrapper from "../components/shared/PageWrapper"
import FilterChips from "../components/shared/FilterChips"
import VideoRow from "../components/shared/VideoRow"

const CHIPS = ["All", "Videos", "Channels", "Playlists", "This week", "This month", "This year"]

const RESULTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Search Result Video Title — Entry ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 1}K views · ${Math.floor(Math.random() * 11) + 1} months ago`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  desc: "This is the video description snippet shown in search results to give viewers a preview of what the video is about.",
}))

const SearchPage = () => {
  const [activeChip, setActiveChip] = useState("All")

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <FilterChips chips={CHIPS} active={activeChip} onSelect={setActiveChip} />
        <div className="flex flex-col gap-2">
          {RESULTS.map((v) => (
            <VideoRow
              key={v.id}
              title={v.title}
              channel={v.channel}
              views={v.views}
              duration={v.duration}
              thumbWidth="w-64"
              extra={
                <p className="text-[#aaa] text-xs line-clamp-2 mt-1">{v.desc}</p>
              }
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default SearchPage
