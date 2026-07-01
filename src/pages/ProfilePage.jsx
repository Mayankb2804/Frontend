import { useUser } from "../context/UserContext"
import { NavLink, useNavigate } from "react-router-dom"
import { getChannelStats, getChannelVideos, currentUser, getUserPlaylists, deleteVideo, togglePublishBtn, updateVideo } from "../services/user.api"
import { useEffect, useState } from "react";
const ProfilePage = () => {
  const { menuOpen } = useUser();
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalViews: 0,
    totalSubscribers: 0,
    totalLikes: 0,
  })
  const [videos, setVideos] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [videobtn, setVideobtn] = useState(true)
  const [playlistbtn, setPlaylistbtn] = useState(false)
  const [aboutbtn, setAboutbtn] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    if (openMenuId) {
      document.addEventListener("click", handleClickOutside)
    }
    return () => document.removeEventListener("click", handleClickOutside)
  }, [openMenuId])
  const [editVideo, setEditVideo] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editThumbnail, setEditThumbnail] = useState(null)
  const [editThumbnailPreview, setEditThumbnailPreview] = useState(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await currentUser()
        const statsData = await getChannelStats()
        const videosData = await getChannelVideos()
        const playlistsData = await getUserPlaylists()
        setUser(userData)
        setStats(statsData)
        setVideos(videosData || [])
        setPlaylists(playlistsData || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  },[])
    
  const openEditPanel = (v) => {
    setEditVideo(v)
    setEditTitle(v.title || "")
    setEditDescription(v.description || "")
    setEditThumbnail(null)
    setEditThumbnailPreview(v.thumbnail || null)
    setEditError("")
  }

  const handleEditSave = async () => {
    if (!editVideo) return
    setEditLoading(true)
    setEditError("")
    try {
      const updated = await updateVideo({
        videoId: editVideo._id,
        title: editTitle,
        description: editDescription,
        thumbnail: editThumbnail
      })
      setVideos((prev) =>
        prev.map((v) => v._id === editVideo._id ? { ...v, ...updated } : v)
      )
      setEditVideo(null)
    } catch (err) {
      setEditError(err?.response?.data?.message || "Failed to update video")
    } finally {
      setEditLoading(false)
    }
  }

  const deleteUploadedVideo = async (videoId) => {
    try {
      await deleteVideo({videoId})
      setVideos((prev) => prev.filter((v) => v._id !== videoId))
    } catch (error) {
      console.error(error || "Error occured while Deleting Video")
    }
  }

  const togglePublish = async (videoId) => {
    try {
      const response = await togglePublishBtn({videoId})
      setVideos((prev) =>
        prev.map((v) =>
          v._id === videoId ? { ...v, isPublish: response.isPublish } : v
        )
      )
    } catch (error) {
      console.error(error || "Error occured while toggling publish")
    }
  }
  return (
    <>
    <div className={`transition-all h-screen duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>
      <div
        className="w-full h-40 relative"
        style={{ background: user?.coverImage ? `url(${user.coverImage}) center/cover no-repeat` : "linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)" }}
      >
        <button className="absolute bottom-3 right-4 bg-white/15 border border-white/20 text-white text-sm px-4 py-1.5 rounded-md">
          Edit cover
        </button>
        {/* Avatar inside cover, bottom left aligned with content */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 sm:left-[max(calc(50%-24rem),2rem)]">
          <div className="w-20 h-20 rounded-full bg-[#e24b4a] border-[3px] border-[#0f0f0f] flex items-center justify-center text-2xl font-medium text-white">
      
      <img
        src={user?.avatar}
        alt={user?.username}
        className="w-full h-full object-cover rounded-full"
      />
    
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-4xl mx-auto px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-white mb-0.5">{user?.fullname}</h1>
            <p className="text-sm text-[#aaa]">@{user?.username} · {stats.totalSubscribers} subscribers · {stats?.totalVideos} videos</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate("/profile/edit-profile")
            } 
            className="bg-transparent border border-[#555] text-white text-sm px-4 py-1.5 rounded-full">
              Edit profile
            </button>
            <button
              onClick={() => navigate("/profile/upload")}
              className="bg-[#e24b4a] text-white text-sm px-4 py-1.5 rounded-full font-medium"
            >
              Upload video
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#333] mb-6">
          <button
            onClick={() => { setVideobtn(true); setPlaylistbtn(false); setAboutbtn(false) }}
            className={`bg-transparent border-none text-sm px-5 py-2.5 border-b-2 font-medium ${ videobtn ? "text-white border-white" : "text-[#aaa] border-transparent" }`}
          >
            Videos
          </button>
          <button
            onClick={() => { setVideobtn(false); setPlaylistbtn(true); setAboutbtn(false) }}
            className={`bg-transparent border-none text-sm px-5 py-2.5 border-b-2 font-medium ${ playlistbtn ? "text-white border-white" : "text-[#aaa] border-transparent" }`}
          >
            Playlists
          </button>
          <button
            onClick={() => { setVideobtn(false); setPlaylistbtn(false); setAboutbtn(true) }}
            className={`bg-transparent border-none text-sm px-5 py-2.5 border-b-2 font-medium ${ aboutbtn ? "text-white border-white" : "text-[#aaa] border-transparent" }`}
          >
            About
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-center">
            <p className="text-2xl font-medium text-white mb-0">{stats.totalVideos}</p>
            <p className="text-xs text-[#aaa] mt-1">Videos</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-center">
            <p className="text-2xl font-medium text-white mb-0">{stats.totalSubscribers}</p>
            <p className="text-xs text-[#aaa] mt-1">Subscribers</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-center">
            <p className="text-2xl font-medium text-white mb-0">{stats.totalViews}</p>
            <p className="text-xs text-[#aaa] mt-1">Total views</p>
          </div>
        </div>

        {/* Videos or empty state */}
        {(videobtn && !playlistbtn && !aboutbtn) ? videos.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#333] rounded-xl">
            <p className="text-lg font-medium text-white mb-2">No videos yet</p>
            <p className="text-sm text-[#aaa] mb-4">Upload your first video to get started</p>
            <button
              onClick={() => navigate("/profile/upload")}
              className="bg-[#e24b4a] text-white text-sm px-5 py-2 rounded-full font-medium"
            >
              Upload video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <div key={v._id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333]">
                <div className="relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full aspect-video object-cover" />
                  <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                    v.isPublish ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'
                  }`}>
                    {v.isPublish ? 'Public' : 'Private'}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <div>
                    <p className="text-white text-sm font-medium truncate">{v.title}</p>
                    <p className="text-[#aaa] text-xs mt-1">{v.views} views</p>
                  </div>
                  <div className="flex items-center justify-between relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuId(openMenuId === v._id ? null : v._id)
                    }}
                    className="text-[#aaa] hover:text-white hover:bg-[#3f3f3f] w-7 h-7 flex items-center justify-center rounded-full text-sm bg-transparent border-none cursor-pointer transition-colors"
                  >
                    ⋮
                  </button>

                   {openMenuId === v._id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 bottom-9 z-50 w-44 bg-[#212121] border border-[#3f3f3f] rounded-xl shadow-xl py-2"
                    >
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          openEditPanel(v)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          togglePublish(v._id)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                        style={{ color: v.isPublish ? '#4ade80' : '#f87171' }}
                      >
                        {v.isPublish ? '🟢 Published' : '🔴 Private'}
                      </button>
                      <div className="my-1 border-t border-[#3f3f3f]" />
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          deleteUploadedVideo(v._id)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                      >
                        🗑️ Delete
                      </button>
                      
                    </div>
                  )}
                  </div>
                </div>
              </div>
            ))}
          </div>
                ): (!videobtn && playlistbtn && !aboutbtn) ? (

          // Playlists section
          playlists.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#333] rounded-xl">
              <p className="text-lg font-medium text-white mb-2">No playlists yet</p>
              <p className="text-sm text-[#aaa]">Create a playlist to organize your videos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((p) => (
                <NavLink to={`/playlists/${p._id}` }key={p._id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] cursor-pointer hover:border-[#555]">
                  <div className="w-full aspect-video bg-[#272727] flex items-center justify-center">
                    <span className="text-4xl">🎵</span>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[#aaa] text-xs mt-1">{p.videos?.length || 0} videos</p>
                  </div>
                </NavLink >
              ))}
            </div>
          )

        ) : (

          // About section
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#aaa] uppercase tracking-wider">Full name</p>
              <p className="text-white text-sm">{user?.fullname || "—"}</p>
            </div>
            <div className="border-t border-[#333]" />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#aaa] uppercase tracking-wider">Username</p>
              <p className="text-white text-sm">@{user?.username || "—"}</p>
            </div>
            <div className="border-t border-[#333]" />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#aaa] uppercase tracking-wider">Total videos</p>
              <p className="text-white text-sm">{stats.totalVideos}</p>
            </div>
            <div className="border-t border-[#333]" />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#aaa] uppercase tracking-wider">Total views</p>
              <p className="text-white text-sm">{stats.totalViews}</p>
            </div>
            <div className="border-t border-[#333]" />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#aaa] uppercase tracking-wider">Subscribers</p>
              <p className="text-white text-sm">{stats.totalSubscribers}</p>
            </div>
          </div>

        )}

      </div>
    </div>

    {/* Edit Video Modal */}
    {editVideo && (
      <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        onClick={() => setEditVideo(null)}
      >
        <div
          className="bg-[#212121] border border-[#333] rounded-xl w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#333]">
            <p className="text-white text-sm font-medium">Edit video</p>
            <button
              onClick={() => setEditVideo(null)}
              className="text-[#aaa] hover:text-white text-lg bg-transparent border-none cursor-pointer leading-none"
            >
              ✕
            </button>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Thumbnail preview + change */}
            <div
              className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#272727] cursor-pointer group"
              onClick={() => document.getElementById('edit-thumbnail-input').click()}
            >
              {editThumbnailPreview
                ? <img src={editThumbnailPreview} alt="thumbnail" className="w-full h-full object-cover" />
                : <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">📷 Change thumbnail</span>
              </div>
              <input
                id="edit-thumbnail-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  setEditThumbnail(file)
                  setEditThumbnailPreview(URL.createObjectURL(file))
                }}
              />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#aaa] text-xs">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-[#0f0f0f] border border-[#333] focus:border-[#3ea6ff] outline-none text-white text-sm rounded-lg px-3 py-2.5 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#aaa] text-xs">Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="bg-[#0f0f0f] border border-[#333] focus:border-[#3ea6ff] outline-none text-white text-sm rounded-lg px-3 py-2.5 resize-none transition-colors"
              />
            </div>

            {/* Error */}
            {editError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2">
                {editError}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-5 py-4 border-t border-[#333]">
            <button
              onClick={() => setEditVideo(null)}
              className="flex-1 bg-transparent border border-[#555] text-white text-sm py-2 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              disabled={editLoading || !editTitle.trim()}
              className="flex-1 bg-[#3ea6ff] hover:bg-[#65b8ff] disabled:bg-[#2a2a2a] disabled:text-[#666] disabled:cursor-not-allowed text-[#0f0f0f] text-sm font-medium py-2 rounded-lg border-none cursor-pointer transition-colors"
            >
              {editLoading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ProfilePage
