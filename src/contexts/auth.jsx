import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "./../axios/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const login = (userData) => {
    setUserInfo(userData);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = Cookies.get("token");

  const getUserInfo = async (token) => {
    try {
      const res = await Api.post("/Permission/GetPermissionsUserByUser", {
        token,
      });

      setIsLoggedIn(true);
      setUserInfo(res.data.result);

      if (pathname === "/login") navigate("/");
    } catch (error) {
      console.log("error getting user info", error);

      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) return navigate("/login");

    getUserInfo(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used in a AuthProvider");
  }

  return context;
};

export default AuthProvider;
