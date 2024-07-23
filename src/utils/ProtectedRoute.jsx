import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { useEffect } from "react";
import Cookies from "js-cookie";

export let incomingPath = null;

export default function ProtectedRoute() {
  const { isLoggedIn, userInfo, token } = useAuthContext();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  incomingPath = pathname;

  const currentToken = Cookies.get("token");

  useEffect(() => {
    if (!currentToken) navigate("/login");
  }, [pathname]);

  if (isLoggedIn === false) {
    console.log("navigate in protected route if condition");
    return navigate("/login", { replace: true });
  }

  return <Outlet />;
}
