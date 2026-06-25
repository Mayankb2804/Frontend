import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <UserContext.Provider value={{ user, setUser, menuOpen, setMenuOpen }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
