import Api from "../api";

export const getAllCups = async (data) =>
  (await Api.post("/Cap/GetAllTitleCap", data)).data;

export const addCup = async (data) =>
  (await Api.post("/Cap/AddNewTitleCap", data)).data;

export const removeCup = async (data) =>
  await Api.post("/Cap/RemoveTitleCap", data);

export const addCupItem = async (data) =>
  (await Api.post("/Cap/AddNewTitleCapItem", data)).data;

export const getCupItems = async (data) =>
  (await Api.post("/Cap/GetAllTitleCapItems", data)).data;
