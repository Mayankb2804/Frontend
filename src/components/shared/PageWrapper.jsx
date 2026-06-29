import { useUser } from "../../context/UserContext"

const PageWrapper = ({ children, className = "" }) => {
  const { menuOpen } = useUser()
  return (
    <div className={`min-h-screen bg-[#0f0f0f] transition-all duration-300 ${menuOpen ? "ml-60" : "ml-0"} ${className}`}>
      {children}
    </div>
  )
}

export default PageWrapper
