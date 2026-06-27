import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
  const { menuOpen } = useUser();
  const navigate = useNavigate()

  return (
    <div className={`transition-all h-screen duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>

      {/* Cover image */}
      <div className="w-full h-40 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative">
        <button className="absolute bottom-3 right-4 bg-white/15 border border-white/20 text-white text-sm px-4 py-1.5 rounded-md">
          Edit cover
        </button>
        {/* Avatar inside cover, bottom left */}
        <div className="absolute -bottom-10 left-[calc(50%-410px-1rem)]">
          <div className="w-20 h-20 rounded-full bg-[#e24b4a] border-[3px] border-[#0f0f0f] flex items-center justify-center text-2xl font-medium text-white">
            MB
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-4xl mx-auto px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-white mb-0.5">Mayank Bansal</h1>
            <p className="text-sm text-[#aaa]">@mbdon12 · 0 subscribers · 0 videos</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate("/profile/edit")
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
          <button className="bg-transparent border-none text-white text-sm px-5 py-2.5 border-b-2 border-white font-medium">
            Videos
          </button>
          <button className="bg-transparent border-none text-[#aaa] text-sm px-5 py-2.5 border-b-2 border-transparent">
            Playlists
          </button>
          <button className="bg-transparent border-none text-[#aaa] text-sm px-5 py-2.5 border-b-2 border-transparent">
            About
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-center">
            <p className="text-2xl font-medium text-white mb-0">0</p>
            <p className="text-xs text-[#aaa] mt-1">Videos</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-center">
            <p className="text-2xl font-medium text-white mb-0">0</p>
            <p className="text-xs text-[#aaa] mt-1">Subscribers</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-center">
            <p className="text-2xl font-medium text-white mb-0">0</p>
            <p className="text-xs text-[#aaa] mt-1">Total views</p>
          </div>
        </div>

        {/* Empty state */}
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

      </div>
    </div>
  )
}

export default ProfilePage
