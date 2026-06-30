import { useEffect, useState } from "react"
import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import VideoCard from "../components/shared/VideoCard"
import { getLikedVideos } from "../services/user.api"

const LikedPage = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const data = await getLikedVideos()
        setVideos(data)
      } catch (err) {
        console.error("Failed to fetch liked videos:", err)
      }
    }
    fetchLikedVideos()
  }, [])

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader icon="👍" title="Liked videos" subtitle={`${videos.length} videos`} />
        {videos.length === 0 ? (
          <p className="text-[#aaa] text-sm mt-6">No liked videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {videos.map((v) => (
              <VideoCard key={v._id} {...v} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default LikedPage
