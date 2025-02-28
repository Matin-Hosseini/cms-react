import Api from "../api";

export const getUserInfo = async (token) => {
  return await Api.post("/Permission/GetPermissionsUserByUser", {
    token,
  });
};
