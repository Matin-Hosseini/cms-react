import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import DialogHeader from "../../../components/DialogHeader";
import { Calendar } from "react-multi-date-picker";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fa";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { gregorianDateToJalali } from "../../../utils/funcs/gregorianToJalaali";
import { useMutation } from "@tanstack/react-query";
import { addCustomerGaming } from "../../../services/requests/gaming";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import ThreeDotsLoading from "./../../../components/ThreeDotLoading";

dayjs.locale("fa");

const SetPresenceDate = ({ open, onClose, mutation, customer }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedtime] = useState(dayjs());

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const { showSnackbar } = useSnackbar();

  const addCustomerGamingMutation = useMutation({
    mutationFn: async (data) => await addCustomerGaming(data),
    onSuccess: () => {
      onClose();

      mutation.mutate({
        token: Cookies.get("token"),
        customer_Id: customer.customer_ID,
      });

      showSnackbar("ارسال شد.");
    },
    onError: (error) => {
      console.log(error);
      showSnackbar("خطا در برقراری ارتباط", "error");
    },
  });

  const onSend = (data) => {
    const dateTime = dayjs(selectedDate)
      .hour(selectedTime.hour())
      .minute(selectedTime.minute())
      .second(0)
      .millisecond(0);

    const mutationData = {
      token: Cookies.get("token"),
      typeOfRegisterCustomer_ID: data.result.games[0].id,
      timePresent: dateTime.toISOString(),
      hourPresent: selectedTime.format("HH:mm"),
    };

    addCustomerGamingMutation.mutate(mutationData);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        fullScreen={isBelowMd}
        maxWidth="md"
        sx={{
          "& .MuiDialog-container .MuiPaper-root": {
            height: "100%",
          },
        }}
      >
        <DialogHeader
          title={"تنظیم تاریخ پیامک"}
          onClose={() => setDateDialog(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <div className="flex flex-col items-center lg:flex-row justify-between">
            <div className="mb-5">
              <Calendar
                calendar={persian}
                locale={persian_fa}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date.toDate())}
              />
            </div>

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={{
                cancelButtonLabel: "لغو",
                clearButtonLabel: "پاک کردن",
                okButtonLabel: "تایید",
                timePickerToolbarTitle: "انتخاب ساعت",
              }}
            >
              <StaticTimePicker
                sx={{
                  "& .MuiDialogActions-root": {
                    display: "none",
                  },
                }}
                orientation="portrait"
                openTo="hours"
                ampm={false}
                value={selectedTime}
                onChange={(time) => setSelectedtime(time)}
              />
            </LocalizationProvider>
          </div>
          <div>
            <div className="mb-4">
              <Typography
                component={"h2"}
                fontWeight={"bold"}
                fontSize={20}
                mb={2}
              >
                پیام ارسالی:
              </Typography>
              <Typography component={"p"}>
                {mutation.data.result.firstName} {mutation.data.result.lastName}{" "}
                عزیز ضمن تشکر بابت ثبت نام شما بازی{" "}
                <span className="text-blue-500">
                  {mutation.data.result.games[0].name}
                </span>{" "}
                در روز{" "}
                <span className="text-green-600">
                  {gregorianDateToJalali(
                    dayjs(selectedDate)
                      .hour(selectedTime.hour())
                      .minute(selectedTime.minute())
                      .second(0)
                      .millisecond(0)
                      .toISOString()
                  )}
                </span>{" "}
                در ساعت{" "}
                <span className="text-violet-500">
                  {selectedTime.format("HH:mm")}
                </span>{" "}
                برگذار می شود. و ایران اورجینال منتظر حضور شما می باشد.
              </Typography>
            </div>

            <Button
              disabled={addCustomerGamingMutation.isPending}
              fullWidth
              className="py-3"
              variant="contained"
              onClick={() => onSend(mutation.data)}
            >
              {addCustomerGamingMutation.isPending ? (
                <ThreeDotsLoading />
              ) : (
                "ارسال پیام"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetPresenceDate;
