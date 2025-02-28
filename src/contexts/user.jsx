import { createContext, useContext, useEffect, useState } from "react";
import pages from "../../data/pages";
import createUserPages from "../utils/createUserPages";
import { useAuthContext } from "./auth";

import { useMutation } from "@tanstack/react-query";
import { getUserInfo } from "../services/requests/user";
import { Navigate, useNavigate } from "react-router-dom";
import GlobalLoading from "../components/GlobalLoading";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userPages, setUserPages] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const authContext = useAuthContext();

  const getUserInfoMutation = useMutation({
    mutationKey: ["user-info"],
    mutationFn: async (token) => await getUserInfo(token),
    onSuccess: (data) => {
      setUserInfo(data.data.result);
      authContext.setIsLoggedIn(true);
    },
  });

  useEffect(() => {
    if (authContext.token && !getUserInfoMutation.isError) {
      getUserInfoMutation.mutate(authContext.token);
    }

    if (authContext.isLoggedIn) {
      console.log(userInfo);
      const createdPages = createUserPages(userInfo.permissions, pages);

      setUserPages(createdPages);
    }
  }, [authContext]);

  return (
    <UserContext.Provider value={{ userPages, userInfo }}>
      {getUserInfoMutation.isError && <Navigate to={"/login"} />}
      {getUserInfoMutation.isPaused && <GlobalLoading />}
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
