import { useUser } from "../context/UserContext"

const Subscriptionpage = () => {
  const {menuOpen} = useUser();

  return (
    <div className={`p-4 transition-all duration-300 ${menuOpen ? "ml-60" : "ml-0"}`}>
      <p className="text-white">Subscriptions Page</p>
    </div>
  )
}

export default Subscriptionpage