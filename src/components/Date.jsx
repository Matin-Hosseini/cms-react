import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/purple.css";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";

export default function Date() {
  const [value, setValue] = useState();

  return (
    <div>
      <DatePicker
        animations={[
          opacity(),
          transition({
            from: 40,
            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          }),
        ]}
        className=" purple"
        calendar={persian}
        locale={persian_fa}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
