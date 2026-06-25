import { useContext } from "react";
import { useUser } from "../context/UserContext";

const HomePage = () => {
  const { menuOpen } = useUser();
  return (
    <div className={`transition-all duration-300 ${menuOpen? "ml-60": "ml-20"} `}>
      hi
    </div>
  );
};

export default HomePage;
