
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


export default function DatePickerTest() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DateTimePicker
        label="AdapterDateFnsJalali"
        defaultValue={new Date(2025, 25, 2, 12)}
        slotProps={{
          desktopPaper: {
            dir: "rtl",
          },
          mobilePaper: {
            dir: "rtl",
          },
        }}
      />
    </LocalizationProvider>
  );
}
