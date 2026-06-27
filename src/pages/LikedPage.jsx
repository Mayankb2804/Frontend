import { useUser } from "../context/UserContext"

const LikedPage = () => {
  const {menuOpen} = useUser();
  return (
    <div className={`p-4 transition-all duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>
      <p className="text-white">Liked Page</p>
    </div>
  )
}

export default LikedPage