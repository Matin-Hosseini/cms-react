import { useUserContext } from "../contexts/user";

export default function WithHasPermission({ permissions, children }) {
  const {
    userInfo: { permissions: userPermissions },
  } = useUserContext();

  const userPermissionStrings = userPermissions.map(
    (perm) => perm.permission_Name
  );

  const hasAllPermissions = permissions.every((perm) =>
    userPermissionStrings.includes(perm)
  );

  return <>{hasAllPermissions && children}</>;
}
