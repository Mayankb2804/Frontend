import { useUser } from "../context/UserContext"

const SettingsPage = () => {
  const {menuOpen} = useUser();

  return (
    <div className={`p-4 transition-all duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>
      <p className="text-white">Settings Page</p>
    </div>
  )
}

export default SettingsPage