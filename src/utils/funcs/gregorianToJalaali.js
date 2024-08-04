import moment from "moment-jalaali";

const gregorianToJalaali = (sentDate) => {
  const date = moment(sentDate);

  const jalaaliTime = date.format("HH:mm:ss -- jYYYY/jMM/jDD");

  return jalaaliTime;
};

const gregorianDateToJalali = (sentDate) => {
  const date = moment(sentDate);

  const jalaaliTime = date.format("jYYYY/jMM/jDD");

  return jalaaliTime;
};

export { gregorianDateToJalali };

export default gregorianToJalaali;
