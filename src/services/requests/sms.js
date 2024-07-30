import Api from "../api";

export const getSmsCategories = async (token) =>
  (await Api.post("/PanelSms/GetAllTextMessage", { token })).data;

export const sentMessages = async (token) =>
  (await Api.post("/PanelSms/ShowAllPostedSmsLog", { token })).data;

export const sendSmsToAnyone = async (data) =>
  (await Api.post("/PanelSms/SendSmsToAnyOne", data)).data;

export const sendListSmsToAnyOne = async (data) =>
  (await Api.post("/PanelSms/SendListSmsToAnyOne", data)).data;
