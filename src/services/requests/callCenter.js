import Api from "../api";

export const getCallCenterCustomers = async (token) =>
  (await Api.post("/CallCenterCustomer/ShowCallCenterCustomers", { token }))
    .data;
