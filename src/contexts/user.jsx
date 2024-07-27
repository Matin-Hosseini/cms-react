import { createContext, useContext, useEffect, useState } from "react";
import pages from "../../data/pages";
import createUserPages from "../utils/createUserPages";
import { useAuthContext } from "./auth";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userPages, setUserPages] = useState([]);

  const user = useAuthContext();

  useEffect(() => {
    if (user.isLoggedIn) {
      const createdPages = createUserPages(user.userInfo.permissions, pages);

      setUserPages(createdPages);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userPages }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("User context must be used inside UserProvider");
  }

  return context;
};

export default UserProvider;
