import { useUser } from "../context/UserContext"

const PlaylistsPage = () => {
  const {menuOpen} = useUser();

  return (
    <div className={`p-4 transition-all duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>
      <p className="text-white">Playlists Page</p>
    </div>
  )
}

export default PlaylistsPage