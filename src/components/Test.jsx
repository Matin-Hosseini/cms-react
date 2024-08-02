// import * as React from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { StaticDateTimePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";

// export default function Calendar() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar />

//       <StaticDateTimePicker
//         defaultValue={dayjs("2022-04-17T15:30")}
//         onAccept={(data) => console.log(data.hour)}
//       />
//     </LocalizationProvider>
//   );
// }

// App.js
// App.js
// App.js
// App.js
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function App() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("00:00");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toDate());
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleConfirm = () => {
    const dateTime = moment(selectedDate)
      .set("hour", selectedTime.split(":")[0])
      .set("minute", selectedTime.split(":")[1]);
    console.log(dateTime.toISOString());
    console.log(selectedTime);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        تاریخ و ساعت
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"sm"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogTitle>انتخاب تاریخ و ساعت</DialogTitle>
        <DialogContent>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            calendar="persian"
            locale="fa"
            calendarPosition="bottom-right"
            style={{ width: "100%", marginTop: "20px" }}
          />
          <TextField
            label="ساعت را انتخاب کنید"
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            style={{ marginTop: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={handleConfirm}>تأیید</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
