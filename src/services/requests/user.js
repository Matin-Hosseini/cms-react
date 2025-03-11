import Api from "../api";

export const getUserInfo = async (token) =>
  await Api.post("/Permission/GetPermissionsUserByUser", {
    token,
  });
