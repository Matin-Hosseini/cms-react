import { createContext, useContext, useEffect, useState } from "react";
import pages from "../../data/pages";
import createUserPages from "../utils/createUserPages";
import { useAuthContext } from "./auth";
import { useMutation } from "@tanstack/react-query";
import { getUserInfo } from "../services/requests/user";
import { Navigate, useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userPages, setUserPages] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const authContext = useAuthContext();
  const navigate = useNavigate();

  const getUserInfoMutation = useMutation({
    mutationKey: ["user-info"],
    mutationFn: async (token) => await getUserInfo(token),
    onSuccess: (data) => {
      setUserInfo(data.data.result);
      authContext.setIsLoggedIn(true);

      const createdPages = createUserPages(data.data.result.permissions, pages);
      setUserPages(createdPages);
    },
    onError: () => {
      authContext.setIsLoggedIn(false);
      navigate("/login");
    },
  });

  useEffect(() => {
    if (authContext.token && Object.keys(userInfo).length === 0) {
      getUserInfoMutation.mutate(authContext.token);
    }
  }, [authContext]);

  return (
    <UserContext.Provider
      value={{
        userPages,
        userInfo,
        isGettingUserInfo: getUserInfoMutation.isPending,
      }}
    >
      {getUserInfoMutation.isError && <Navigate to={"/login"} />}
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
