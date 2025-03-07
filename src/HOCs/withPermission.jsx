import { useAuthContext } from "../contexts/auth";
import { useUserContext } from "../contexts/user";

const WithPermission = (Component, componentPermissionId, ErrorComponent) => {
  const {
    userInfo: { permissions },
  } = useUserContext();

  const permissionIDs = permissions.map(
    (permission) => permission.permission_Id
  );

  const hasAccess = permissionIDs.some((id) => id === componentPermissionId);

  return (props) => {
    return hasAccess ? (
      <Component {...props} />
    ) : ErrorComponent ? (
      <ErrorComponent />
    ) : (
      <></>
    );
  };
};

export default WithPermission;
