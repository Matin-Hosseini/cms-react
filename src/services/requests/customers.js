import Api from "../api";

export const getAllCustomers = async (data) =>
  (await Api.post("/Customer/GetAllCustomers", data)).data;

export const getCustomerGameDetails = async (data) =>
  (await Api.post("/Gaming/ShowDetailCustmersGaming", data)).data;
