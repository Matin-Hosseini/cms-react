import Api from "../api";

export const getAllRoles = async (token) =>
  (await Api.post("/Role/GetAllRoles", { token })).data;
