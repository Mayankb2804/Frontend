import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { logoutUser } from "../../services/user.api";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/signin");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-[#272727]"
    >
      <LogOut size={18} />
      Sign out
    </button>
  );
};

export default LogoutButton;
