import Api from "../api";

export const insertLoan = async (data) =>
  (await Api.post("/Calculator/InsertCalculatorLoan", data)).data;
