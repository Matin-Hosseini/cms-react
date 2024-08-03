import Api from "../api";

export const addCustomerGaming = async (data) =>
  (await Api.post("/Gaming/AddCustmerGaming", data)).data;
