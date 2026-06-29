import { useUser } from "../context/UserContext"

const HistoryPage = () => {
  const { menuOpen } = useUser()
  return (
    <div className={`p-4 transition-all ${menuOpen ? "ml-60" : "ml-0"}`}>
      <p className="text-white">History Page</p>
    </div>  )
}

export default HistoryPage