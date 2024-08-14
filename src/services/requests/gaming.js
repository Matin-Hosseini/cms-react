import Api from "../api";

export const addCustomerGaming = async (data) =>
  (await Api.post("/Gaming/AddCustmerGaming", data)).data;

export const setWinner = async (data) =>
  (await Api.post("/Gaming/UpdateWinnerCustmersGaming", data)).data;

export const getWinners = async (data) =>
  (await Api.post("/Customer/ShowAllCustomersWinner", data)).data;
