import Api from "../api";

export const getPermissionUserByUser = async (token) =>
  (
    await Api.post("/Permission/GetPermissionsUserByUser", {
      token,
    })
  ).data;
