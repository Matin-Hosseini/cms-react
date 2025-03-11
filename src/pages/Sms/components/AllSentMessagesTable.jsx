import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { faIR } from "@mui/x-data-grid/locales";
import {
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";

import { TbChevronDown } from "react-icons/tb";

export default function AllSentMessagesTable({ allMessages }) {
  const [messages, setMessages] = useState(allMessages);

  const [messageSender, setMessageSender] = useState("all");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const messageSenders = [
    ...new Set(allMessages.map((message) => message.whoSent)),
  ];

  useEffect(() => {
    const today = new Date();

    const fiveDayMessages = messages.filter((message) => {
      const messageDate = new Date(message.whenSent);

      if (messageDate >= startDate && messageDate <= endDate) {
        return true;
      }
    });

    if (!endDate) return;

    setMessages(fiveDayMessages);
  }, [startDate, endDate]);

  useEffect(() => {
    if (messageSender !== "all") {
      setMessages(
        messages.filter((message) => message.whoSent === messageSender)
      );
    }
    if (messageSender === "all") {
      setMessages(allMessages);
    }
  }, [messageSender]);

  const [timeSentAnchor, setTimeSentAnchor] = useState(false);
  const open = Boolean(timeSentAnchor);

  const columns = [
    { field: "phoneNumber", headerName: "شماره تلفن", width: 130 },
    { field: "timeSent", headerName: "تاریخ ارسال", width: 180 },
    { field: "whoSent", headerName: "فرستنده", width: 150 },
    { field: "text", headerName: "متن پیام", width: 2500 },
  ];

  return (
    <>
      <p className="mb-5">فیلتر ها</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* <TextField id="outlined-basic" label="شماره تلفن" variant="outlined" /> */}

        <FormControl sx={{ width: 200 }}>
          <InputLabel id="message-sender-select">فرستنده</InputLabel>
          <Select
            labelId="message-sender-select"
            id="sender-select"
            defaultValue={"all"}
            label="فرستنده"
            onChange={(e) => setMessageSender(e.target.value)}
          >
            <MenuItem value={"all"}>همه</MenuItem>
            {messageSenders.map((sender) => (
              <MenuItem key={sender} value={sender}>
                {sender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <>
          <Button
            className="text-slate-500 border-slate-500"
            variant="outlined"
            id="dropdown-menu-button"
            aria-controls={timeSentAnchor ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={timeSentAnchor ? "true" : undefined}
            onClick={(e) => setTimeSentAnchor(e.currentTarget)}
            endIcon={<TbChevronDown />}
          >
            <span className="ml-12">بازه زمانی ارسال</span>
          </Button>

          <Menu
            id="dropdown-menu"
            anchorEl={timeSentAnchor}
            onClose={() => setTimeSentAnchor(null)}
            open={open}
            MenuListProps={{
              "aria-labelledby": "dropdown-menu-button",
            }}
          >
            <div className="p-4 pb-2">
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <div className="mb-3">
                  <DesktopDatePicker
                    label="از تاریخ"
                    value={startDate}
                    onChange={(newDate) => {
                      console.log(newDate.toISOString());
                      setStartDate(newDate);
                    }}
                  />
                </div>
                <div>
                  <DesktopDatePicker
                    label="تا تاریخ"
                    value={endDate}
                    onChange={(newDate) => {
                      setEndDate(newDate);
                    }}
                  />
                </div>
              </LocalizationProvider>

              <div className="flex flex-col gap-3 my-3">
                <Button
                  className="text-gray-700"
                  onClick={() => setTimeSentAnchor(null)}
                >
                  روز گذشته
                </Button>
                <Button className="text-gray-700">هفته گذشته</Button>
                <Button className="text-gray-700">ماه گذشته</Button>
              </div>
              <Button className="w-full" variant="contained" color="info">
                تایید
              </Button>
            </div>
          </Menu>
        </>
      </div>

      <h2 className="mt-6 mb-3">پیام های ارسال شده</h2>

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
          rows={messages || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 20, 30, 40, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}
