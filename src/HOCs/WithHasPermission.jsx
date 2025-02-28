import { useUserContext } from "../contexts/user";

export default function WithHasPermission({ permissionName, children }) {
  const {
    userInfo: { permissions },
  } = useUserContext();

  const hasAccess = permissions.some(
    (permission) => permission.permission_Name === permissionName
  );

  return <>{hasAccess && children}</>;
}
