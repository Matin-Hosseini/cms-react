import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const storedToken = Cookies.get("token");

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
