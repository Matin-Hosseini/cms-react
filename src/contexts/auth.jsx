import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "./../axios/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const [userInfo, setUserInfo] = useState({});

  const login = (userData, token) => {
    setUserInfo(userData);
    setToken(token);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const storedToken = Cookies.get("token");

  const getUserPermissions = async (token) => {
    try {
      const res = await Api.post("/Permission/GetPermissionsUserByUser", {
        token,
      });

      setIsLoggedIn(true);
      setUserInfo(res.data.result);
      setToken(token);

      return res.data;
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    storedToken ? setToken(storedToken) : navigate("/login");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userInfo,
        login,
        getUserPermissions,
      }}
    >
      {!storedToken && <Navigate to={"/login"} />}
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
