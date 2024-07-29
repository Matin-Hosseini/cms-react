import Api from "../api";

export const getSmsCategories = async (token) => {
  return (await Api.post("/PanelSms/GetAllTextMessage", { token })).data;
};
export const sentMessages = async (token) => {
  return (await Api.post("/PanelSms/ShowAllPostedSmsLog", { token })).data;
};
