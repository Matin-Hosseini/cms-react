import Api from "../api";

export const getAllTables = async (data) =>
  (await Api.post("/PlaceCup/GetAllPlaces", data)).data;

export const updateChair = async (data) =>
  (await Api.post("/PlaceCup/UpdatePlace", data)).data;
