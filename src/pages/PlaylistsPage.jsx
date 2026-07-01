import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import { useEffect, useState } from "react"
import { createPlaylist, getUserPlaylists, updatePlaylist, deletePlaylist } from "../services/user.api"
import { useNavigate } from "react-router-dom"

const PlaylistsPage = () => {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [createPlaylistState, setCreatePlaylistState] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editPlaylistData, setEditPlaylistData] = useState(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userPlaylists = await getUserPlaylists()
        setPlaylists(userPlaylists || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchPlaylists()
  }, [])

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    if (openMenuId) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [openMenuId])

  const createNewPlaylist = async () => {
    try {
      const response = await createPlaylist({ name, description })
      setPlaylists((prev) => [...prev, response])
      setName("")
      setDescription("")
      setCreatePlaylistState(false)
    } catch (error) {
      console.error(error)
    }
  }

  const openEditPanel = (pl) => {
    setEditPlaylistData(pl)
    setEditName(pl.name || "")
    setEditDescription(pl.description || "")
  }

  const handleEditSave = async () => {
    if (!editPlaylistData) return
    setEditLoading(true)
    try {
      const updated = await updatePlaylist({ name: editName, description: editDescription, playlistId: editPlaylistData._id })
      setPlaylists((prev) => prev.map((p) => p._id === editPlaylistData._id ? { ...p, ...updated } : p))
      setEditPlaylistData(null)
    } catch (error) {
      console.error(error)
    } finally {
      setEditLoading(false)
    }
  }

  const handleDeletePlaylist = async (playlistId) => {
    if (!confirm("Delete this playlist? This cannot be undone.")) return
    try {
      await deletePlaylist({ playlistId })
      setPlaylists((prev) => prev.filter((p) => p._id !== playlistId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <PageWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <PageHeader
            title="Playlists"
            subtitle={`${playlists.length} playlists`}
            action={
              <button
                onClick={() => setCreatePlaylistState(true)}
                className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] text-white text-sm px-4 py-2 rounded-full transition-colors border-none cursor-pointer"
              >
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
                  onClick={() => { setCreatePlaylistState(false); setName(""); setDescription("") }}
                  className="text-[#aaa] hover:text-white text-sm px-4 py-2 rounded-full bg-transparent border-none cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewPlaylist}
                  disabled={!name.trim()}
                  className="bg-[#3ea6ff] hover:bg-[#65b8ff] disabled:bg-[#2a2a2a] disabled:text-[#666] disabled:cursor-not-allowed text-[#0f0f0f] text-sm font-medium px-5 py-2 rounded-full border-none cursor-pointer transition-colors"
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
                    <span>{pl.count ?? pl.videos?.length ?? 0} videos</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-white text-sm font-medium mb-1 group-hover:text-[#ccc] transition-colors">
                    {pl.name}
                  </p>
                  <p className="text-[#aaa] text-xs mb-3">View full playlist</p>
                  <div className="flex items-center justify-between relative">
                    <span className="text-[#555] text-xs">
                      {pl.updatedAt ? `Updated ${pl.updatedAt.substring(0, 10)}` : ""}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenMenuId(openMenuId === pl._id ? null : pl._id)
                      }}
                      className="text-[#aaa] hover:text-white hover:bg-[#3f3f3f] w-7 h-7 flex items-center justify-center rounded-full text-sm bg-transparent border-none cursor-pointer transition-colors"
                    >
                      ⋮
                    </button>

                    {openMenuId === pl._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 bottom-9 z-50 w-44 bg-[#212121] border border-[#3f3f3f] rounded-xl shadow-xl py-2"
                      >
                        <button
                          onClick={() => { setOpenMenuId(null); navigate(`/playlists/${pl._id}`) }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                        >
                          ▶ View playlist
                        </button>
                        <button
                          onClick={() => { setOpenMenuId(null); openEditPanel(pl) }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#3f3f3f] bg-transparent border-none cursor-pointer text-left"
                        >
                          ✏️ Edit
                        </button>
                        <div className="my-1 border-t border-[#3f3f3f]" />
                        <button
                          onClick={() => { setOpenMenuId(null); handleDeletePlaylist(pl._id) }}
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
        </div>
      </PageWrapper>

      {/* Edit Playlist Modal */}
      {editPlaylistData && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setEditPlaylistData(null)}
        >
          <div
            className="bg-[#212121] border border-[#333] rounded-xl w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#333]">
              <p className="text-white text-sm font-medium">Edit playlist</p>
              <button
                onClick={() => setEditPlaylistData(null)}
                className="text-[#aaa] hover:text-white text-lg bg-transparent border-none cursor-pointer leading-none"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#aaa] text-xs">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                  className="bg-[#0f0f0f] border border-[#333] focus:border-[#3ea6ff] outline-none text-white text-sm rounded-lg px-3 py-2.5 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#aaa] text-xs">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="bg-[#0f0f0f] border border-[#333] focus:border-[#3ea6ff] outline-none text-white text-sm rounded-lg px-3 py-2.5 resize-none transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 px-5 py-4 border-t border-[#333]">
              <button
                onClick={() => setEditPlaylistData(null)}
                className="flex-1 bg-transparent border border-[#555] text-white text-sm py-2 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={editLoading || !editName.trim()}
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

export default PlaylistsPage
