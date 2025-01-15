import { useAuthContext } from "../contexts/auth";

export default function WithHasPermission({ permissionName, children }) {
  const {
    userInfo: { permissions },
  } = useAuthContext();

  console.log("permissions", permissions);

  const hasAccess = permissions.some(
    (permission) => permission.permission_Name === permissionName
  );

  return <>{hasAccess ? children : <></>}</>;
}
