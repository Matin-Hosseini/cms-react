import moment from "moment-jalaali";

const gregorianToJalaali = (sentDate) => {
  const date = moment(sentDate);

  const jalaaliTime = date.format("HH:mm:ss -- jYYYY/jMM/jDD");

  return jalaaliTime;
};

export default gregorianToJalaali;
