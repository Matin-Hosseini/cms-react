const WithPermission = (Component, userPermissions, componentPermissionId) => {
  const permissionIDs = userPermissions.map(
    (permission) => permission.permission_Id
  );

  const hasAccess = permissionIDs.some((id) => id === componentPermissionId);

  return (props) => {
    return hasAccess ? <Component {...props} /> : <></>;
  };
};

export default WithPermission;
