import Api from "../api";

export const getSmsCategories = async (token) =>
  (await Api.post("/PanelSms/GetAllTextMessage", { token })).data;

export const sentMessages = async (token) =>
  (await Api.post("/PanelSms/ShowAllPostedSmsLog", { token })).data;

export const sendSmsToAnyone = async (data) =>
  (await Api.post("/PanelSms/SendSmsToAnyOne", data)).data;

export const sendListSmsToAnyOne = async (data) =>
  (await Api.post("/PanelSms/SendListSmsToAnyOne", data)).data;

export const addSmsCategory = async (data) =>
  (await Api.post("/PanelSms/AddNewTextMessage", data)).data;

export const removeSmsCategory = async (data) =>
  (await Api.post("/PanelSms/RemoveTextMessage", data)).data;

export const sendCallCenterSms = async (data) =>
  (await Api.post("/PanelSms/SendSmsForCallCenter", data)).data;

export const sendSmsWithCategory = async (data) =>
  (await Api.post("/PanelSms/SendSmsWithCategory", data)).data;

export const editSmsCategory = async (data) =>
  (await Api.post("/PanelSms/EditTextMessage", data)).data;
