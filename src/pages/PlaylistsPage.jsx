import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import { useEffect, useState } from "react"
import { createPlaylist, getUserPlaylists } from "../services/user.api"
import { useNavigate } from "react-router-dom"

const PlaylistsPage = () => {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [createPlaylistState, setCreatePlaylistState] = useState(false)
  const[name, setName] = useState("")
  const[description, setDescription] = useState("")
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userPlaylists = await getUserPlaylists();
        setPlaylists(userPlaylists || []);
      } catch (error) {
        console.error(error)
      }
    } 
    fetchPlaylists();
  },[])

  const createNewPlaylist = async () => {
    try {
      const response = await createPlaylist({name, description});
      setPlaylists((prev) => [...prev, response])
      setName("")
      setDescription("")
      setCreatePlaylistState(false)
    } catch (error) {
      console.error(error)
    }
  };
  
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Playlists"
          subtitle={`${playlists.length} playlists`}
          action={
            <button onClick={()=>{
              setCreatePlaylistState(true)
            }} className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] text-white text-sm px-4 py-2 rounded-full transition-colors border-none cursor-pointer">
              <span className="text-lg leading-none">+</span>
              New playlist
            </button>
          }
        />

        {createPlaylistState && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 mb-6 flex flex-col gap-4">
            <p className="text-white text-sm font-medium">Create new playlist</p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#aaa] text-xs">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My playlist"
                autoFocus
                className="bg-[#0f0f0f] border border-[#333] focus:border-[#3ea6ff] outline-none text-white text-sm rounded-lg px-3 py-2.5 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#aaa] text-xs">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add an optional description"
                rows={3}
                className="bg-[#0f0f0f] border border-[#333] focus:border-[#3ea6ff] outline-none text-white text-sm rounded-lg px-3 py-2.5 resize-none transition-colors"
              />
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={() => {
                  setCreatePlaylistState(false)
                  setName("")
                  setDescription("")
                }}
                className="text-[#aaa] hover:text-white text-sm px-4 py-2 rounded-full bg-transparent border-none cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={()=>{
                  createNewPlaylist()
                  navigate("/playlists")
                }}
                disabled={!name.trim()}
                className="bg-[#3ea6ff] hover:bg-[#65b8ff] disabled:bg-[#2a2a2a] disabled:text-[#666] disabled:cursor-not-allowed text-[#0f0f0f] disabled:text-opacity-100 text-sm font-medium px-5 py-2 rounded-full border-none cursor-pointer transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {playlists.map((pl) => (
            <div
              key={pl._id}
              onClick={() => navigate(`/playlists/${pl._id}`)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden cursor-pointer hover:border-[#444] transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video bg-[#272727]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
                <div className="absolute top-2 left-2 right-2 h-1.5 bg-white/10 rounded-sm" />
                <div className="absolute top-4 left-3 right-3 h-1.5 bg-white/10 rounded-sm" />
                <div className="absolute bottom-0 right-0 bg-black/80 text-white text-xs px-2 py-1 flex items-center gap-1">
                  <span>▶</span>
                  <span>{pl.count} videos</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <p className="text-white text-sm font-medium mb-1 group-hover:text-[#ccc] transition-colors">
                  {pl.name}
                </p>
                <p className="text-[#aaa] text-xs mb-3">View full playlist</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#555] text-xs">Last Updated at {pl.updatedAt.substring(0,10)}</span>
                  <button onClick={() => {
                    
                  }} className="text-[#aaa] hover:text-white text-sm bg-transparent border-none cursor-pointer">⋮</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default PlaylistsPage
