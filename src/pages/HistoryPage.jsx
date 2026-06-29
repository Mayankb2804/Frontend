import { useState } from "react"
import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import VideoRow from "../components/shared/VideoRow"

const ITEMS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  title: `Video Title — Watch History Entry ${i + 1}`,
  channel: "Channel Name",
  views: `${Math.floor(Math.random() * 500) + 1}K views`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
}))

const HistoryPage = () => {
  const [items, setItems] = useState(ITEMS)

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="Watch history"
          action={
            <button
              onClick={() => setItems([])}
              className="text-sm text-[#3ea6ff] hover:underline bg-transparent border-none cursor-pointer"
            >
              Clear all history
            </button>
          }
        />

        {/* Search */}
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa] text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search watch history"
            className="w-full bg-[#121212] border border-[#333] text-white text-sm pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#3ea6ff] placeholder:text-[#555]"
          />
        </div>

        <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-4">Today</p>

        <div className="flex flex-col gap-1">
          {items.map((v) => (
            <VideoRow
              key={v.id}
              {...v}
              onRemove={() => setItems((prev) => prev.filter((x) => x.id !== v.id))}
            />
          ))}
          {items.length === 0 && (
            <p className="text-[#aaa] text-sm text-center py-16">No watch history</p>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default HistoryPage
