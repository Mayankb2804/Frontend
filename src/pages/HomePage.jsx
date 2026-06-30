import { useEffect, useState } from "react"
import PageWrapper from "../components/shared/PageWrapper"
import FilterChips from "../components/shared/FilterChips"
import VideoCard from "../components/shared/VideoCard"
import { getAllVideos } from "../services/user.api"

const CHIPS = ["All", "Music", "Gaming", "Live", "Mixes", "News", "Podcasts", "React", "JavaScript", "Comedy", "Sports"]

const HomePage = () => {
  const [activeChip, setActiveChip] = useState("All")
   const [videos, setVideos] = useState([])

    useEffect(() => {
    async function fetchVideos() {
        const data = await getAllVideos()
        console.log(videos)
        setVideos(data)
    }
    fetchVideos()
}, [])

  return (
    <PageWrapper>
      <div className="px-6 py-6">
        <FilterChips chips={CHIPS} active={activeChip} onSelect={setActiveChip} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((v) => (
            <VideoCard key={v._id} video_id={v._id} {...v} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage
