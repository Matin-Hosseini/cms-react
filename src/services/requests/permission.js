import Api from "../api";

export const getPermissionUserByUser = async (token) =>
  (
    await Api.post("/Permission/GetPermissionsUserByUser", {
      token,
    })
  ).data;

export const getRolePermissions = async ({ token, roleID }) =>
  (await Api.post("/RolePermission/GetPermissionsRole", { token, roleID }))
    .data;
