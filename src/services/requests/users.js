import Api from "../api";

export const getAllUsers = async (data) =>
  (await Api.post("/User/GetAllUsers", data)).data;

export const getUserInformation = async (data) =>
  (await Api.post("/User/GetUserInformation", data)).data;
