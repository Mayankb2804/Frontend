import { useUser } from "../context/UserContext"

const HomePage = () => {
  const { menuOpen } = useUser()
  return (
    <div className={`p-4 transition-all ${menuOpen ? "ml-60" : "ml-0"}`}>
      <p className="text-white">Home Page</p>
    </div>
  )
}

export default HomePage
