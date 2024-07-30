import Api from "../api";

export const getSmsCategories = async (token) =>
  (await Api.post("/PanelSms/GetAllTextMessage", { token })).data;

export const sentMessages = async (token) =>
  (await Api.post("/PanelSms/ShowAllPostedSmsLog", { token })).data;

export const sendSmsToAnyone = async ({ token, text, phoneNumber }) =>
  (
    await Api.post("/PanelSms/SendSmsToAnyOne", {
      token,
      text,
      phoneNumber,
    })
  ).data;
