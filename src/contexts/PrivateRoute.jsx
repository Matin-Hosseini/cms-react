import ErrorLayout from "../components/ErrorLayout";
import GlobalLoading from "../components/GlobalLoading";
import { useUserContext } from "./user";
import accessDeniedImg from "./../assets/images/illustrations/no-access.webp";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, routePermissions }) {
  const storedToken = Cookies.get("token");
  if (storedToken) <Navigate to={"/login"} />;

  const { userInfo, isGettingUserInfo } = useUserContext();

  const { permissions } = userInfo;

  const entries = Object.entries(userInfo);

  const userPermissions = permissions?.map((perm) => perm.permission_Name);

  const hasPermissionToRoute = routePermissions.some((perm) => {
    return userPermissions?.includes(perm);
  });

  return (
    <>
      {hasPermissionToRoute ? (
        children
      ) : (
        <ErrorLayout
          img={accessDeniedImg}
          title={"شما به این صفحه دسترسی ندارید."}
        />
      )}
    </>
  );
}
