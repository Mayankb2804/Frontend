import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { getChannelStats, getAllVideos, currentUser, getUserPlaylists } from "../services/user.api"
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await currentUser()
        const statsData = await getChannelStats()
        const videosData = await getAllVideos()
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
    
  return (
    <div className={`transition-all h-screen duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>

      {/* Cover image */}
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
                <img src={v.thumbnail} alt={v.title} className="w-full aspect-video object-cover" />
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{v.title}</p>
                  <p className="text-[#aaa] text-xs mt-1">{v.views} views</p>
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
                <div key={p._id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] cursor-pointer hover:border-[#555]">
                  <div className="w-full aspect-video bg-[#272727] flex items-center justify-center">
                    <span className="text-4xl">🎵</span>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[#aaa] text-xs mt-1">{p.videos?.length || 0} videos</p>
                  </div>
                </div>
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
  )
}

export default ProfilePage
