import Api from "../api";

export const getAllUsers = async (data) =>
  (await Api.post("/User/GetAllUsers", data)).data;

export const getUserInformation = async (data) =>
  (await Api.post("/User/GetUserInformation", data)).data;

export const addUser = async (data) =>
  (await Api.post("/User/AddUser", data)).data;

export const getUserProfile = async (token) =>
  (
    await Api.get(`/User/GetProfileUser`, {
      params: {
        Token: token,
      },
    })
  ).data;

export const editUserProfile = async (data) =>
  (await Api.post("/User/EditProfileUser", data)).data;
