import moment from "moment-jalaali";
import dayjs from "dayjs";
import jalali from "dayjs-jalali";

const gregorianToJalaali = (sentDate) => {
  const date = moment(sentDate);

  const jalaaliTime = date.format("HH:mm:ss -- jYYYY/jMM/jDD");

  return jalaaliTime;
};
const converter = (text) =>
  text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);

const gregorianDateToJalali = (sentDate) => {
  const date = moment(sentDate);

  const jalaaliTime = date.format("jYYYY/jMM/jDD");

  return converter(jalaaliTime);
};

export { gregorianDateToJalali };

export default gregorianToJalaali;
