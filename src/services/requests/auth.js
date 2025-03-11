import Api from "../api";

export const login = async ({ userName, password }) =>
  await Api.post("/Account/GetToken", {
    userName,
    password,
  });
