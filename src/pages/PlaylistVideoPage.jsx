import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageWrapper from "../components/shared/PageWrapper"
import { getPlaylistById, removeVideoFromPlaylist } from "../services/user.api"

const PlaylistVideoPage = () => {
  const { playlistId } = useParams()
  const navigate = useNavigate()
  const [playlist, setPlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [openMenuId, setOpenMenuId] = useState(null)

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true)
      setError("")
      try {
        const data = await getPlaylistById(playlistId)
        setPlaylist(data)
        setVideos(data?.videos || [])
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load playlist")
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylist()
  }, [playlistId])

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    if (openMenuId) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [openMenuId])

  const handleRemoveVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist({ videoId, playlistId })
      setVideos((prev) => prev.filter((v) => v._id !== videoId))
    } catch (err) {
      console.error("Failed to remove video:", err)
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-[#aaa] text-sm">Loading playlist...</p>
        </div>
      </PageWrapper>
    )
  }

  if (error || !playlist) {
    return (
      <PageWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/playlists")}
            className="text-[#aaa] hover:text-white text-sm mb-4 bg-transparent border-none cursor-pointer"
          >
            ← Back to playlists
          </button>
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
            {error || "Playlist not found"}
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/playlists")}
          className="flex items-center gap-1 text-[#aaa] hover:text-white text-sm mb-6 bg-transparent border-none cursor-pointer transition-colors"
        >
          ← Back to playlists
        </button>

        {/* Playlist header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="relative w-full sm:w-64 aspect-video shrink-0 rounded-xl overflow-hidden bg-[#272727]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-40">🎬</span>
            </div>
            <div className="absolute bottom-0 right-0 bg-black/80 text-white text-xs px-2 py-1 flex items-center gap-1">
              <span>▶</span>
              <span>{videos.length} video{videos.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2 min-w-0">
            <h1 className="text-2xl font-semibold text-white truncate">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-[#aaa] text-sm leading-relaxed">{playlist.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-[#3ea6ff] flex items-center justify-center text-[#0f0f0f] text-xs font-bold shrink-0 overflow-hidden">
                {playlist.owner?.avatar
                  ? <img src={playlist.owner.avatar} alt="" className="w-full h-full object-cover" />
                  : (playlist.owner?.username?.[0]?.toUpperCase() || "?")}
              </div>
              <span className="text-[#aaa] text-sm">{playlist.owner?.fullname || playlist.owner?.username}</span>
            </div>
          </div>
        </div>

        {/* Video list */}
        {videos.length === 0 ? (
          <div className="border border-dashed border-[#333] rounded-xl py-16 flex flex-col items-center gap-2">
            <span className="text-3xl opacity-50">📭</span>
            <p className="text-[#aaa] text-sm">This playlist has no videos yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {videos.map((v, i) => (
              <div
                key={v._id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors group"
              >
                <span className="text-[#666] text-sm w-5 text-center shrink-0">{i + 1}</span>

                {/* Thumbnail — clickable */}
                <div
                  onClick={() => navigate(`/watch/${v._id}`)}
                  className="relative w-40 aspect-video shrink-0 rounded-lg overflow-hidden bg-[#272727] cursor-pointer"
                >
                  {v.thumbnail
                    ? <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                    : <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />}
                  {v.duration && (
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {v.duration}
                    </span>
                  )}
                </div>

                {/* Info — clickable */}
                <div
                  onClick={() => navigate(`/watch/${v._id}`)}
                  className="flex flex-col gap-1 min-w-0 flex-1 cursor-pointer"
                >
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#ccc] transition-colors">
                    {v.title}
                  </p>
                  <p className="text-[#aaa] text-xs">{v.views ?? 0} views</p>
                </div>

                {/* Three dot menu */}
                <div className="relative shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuId(openMenuId === v._id ? null : v._id)
                    }}
                    className="text-[#aaa] hover:text-white hover:bg-[#3f3f3f] w-8 h-8 flex items-center justify-center rounded-full text-sm bg-transparent border-none cursor-pointer transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ⋮
                  </button>

                  {openMenuId === v._id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-9 z-50 w-48 bg-[#212121] border border-[#3f3f3f] rounded-xl shadow-xl py-2"
                    >
                      <button
                        onClick={() => { setOpenMenuId(null); navigate(`/watch/${v._id}`) }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                      >
                        ▶ Play video
                      </button>
                      <div className="my-1 border-t border-[#3f3f3f]" />
                      <button
                        onClick={() => { setOpenMenuId(null); handleRemoveVideo(v._id) }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                      >
                        🗑️ Remove from playlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default PlaylistVideoPage
