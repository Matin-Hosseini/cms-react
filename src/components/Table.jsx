import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "../contexts/snackbar";
import { useMutation } from "@tanstack/react-query";
import { getCustomerGameDetails } from "../services/requests/customers";
import { IoMdCheckmark } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import DialogHeader from "./DialogHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";

import "dayjs/locale/fa";
import gregorianToJalaali from "../utils/funcs/gregorianToJalaali";
import { addCustomerGaming } from "../services/requests/gaming";
import ThreeDotsLoading from "./ThreeDotLoading";

dayjs.locale("fa");

export default function Table({ customers }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDialogRow, setDeleteDialogRow] = useState({});
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [dateDialog, setDateDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentRow, setCurrentRow] = useState(0);

  const [selectedTime, setSelectedtime] = useState(dayjs());

  const { showSnackbar } = useSnackbar();

  const sendSMS = async (params) => {
    const userPhone = params.row.phoneNumber;

    try {
      const res = await axios.post(
        "https://iroriginaltest.com/api/PanelSms/SendSmsToAnyOne",
        {
          token: Cookies.get("token"),
          text: "برای مسابقات شطرنج حضور یابید.",
          phoneNumber: "09129323541",
        },
        {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        }
      );
    } catch (error) {
      if (error.response.status === 401) {
        showSnackbar("شما دسترسی لازم به این قسمت را ندارید.");
      }
    }
  };

  const token = Cookies.get("token");

  const mutation = useMutation({
    mutationFn: async (data) => await getCustomerGameDetails(data),
  });
  
  const addCustomerGamingMutation = useMutation({
    mutationFn: async (data) => await addCustomerGaming(data),
    onSuccess: () => {
      setDateDialog(false);
      mutation.mutate({ token, customer_Id: currentRow });

      showSnackbar("ارسال شد.");
    },
    onError: () => {
      showSnackbar("خطا در برقراری ارتباط", "error");
    },
  });

  const showCustomerInfo = async (row) => {
    setDetailsDialog(true);
    setCurrentRow(row.customer_ID);

    mutation.mutate({ token, customer_Id: row.customer_ID });
  };

  const columns = [
    // { field: "id", headerName: "شناسه", width: 70 },
    { field: "firstName", headerName: "نام", width: 130 },
    { field: "lastName", headerName: "نام خانوادگی", width: 180 },
    { field: "phoneNumber", headerName: "شماره موبایل", width: 150 },
    { field: "nationalCode", headerName: "کد ملی", type: "string", width: 120 },
    {
      field: "registerDate",
      headerName: "تاریخ ثبت نام",
      type: "string",
      width: 200,
    },
    {
      field: "actions",
      headerName: "",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center h-full">
            <Button
              color="success"
              onClick={() => showCustomerInfo(params.row)}
              className="flex items-center gap-2"
            >
              <RxEyeOpen />
              جزئیات
            </Button>
          </div>
        );
      },
    },
  ];

  const processRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleDeleteSelected = () => {
    setRows((prevRows) =>
      prevRows.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

  const deleteCustomer = () => {
    console.log(deleteDialogRow);
    setShowDeleteModal(false);
  };

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDateChange = (date) => {
    setSelectedDate(date.toDate());
  };

  const onSend = (data) => {
    const dateTime = dayjs(selectedDate)
      .hour(selectedTime.hour())
      .minute(selectedTime.minute())
      .second(0)
      .millisecond(0);
    // console.log(dateTime.toISOString());
    // console.log(gregorianToJalaali(dateTime.toISOString()));
    // console.log(selectedTime.format("HH:mm"));

    const mutationData = {
      token: Cookies.get("token"),
      typeOfRegisterCustomer_ID: data.result.games[0].id,
      timePresent: dateTime.toISOString(),
      hourPresent: selectedTime.format("HH:mm"),
    };
    console.log("addCustomerGaming mutation data: ", mutationData);
    addCustomerGamingMutation.mutate(mutationData);
  };

  return (
    <>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
          rows={customers}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 15, 20, 30, 40]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          getRowId={(row) => row.customer_ID}
        />

        <DeleteDialog
          show={showDeleteModal}
          onDialogClose={() => setShowDeleteModal(false)}
          row={deleteDialogRow}
          onDelete={deleteCustomer}
        />
      </div>

      <Dialog
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogContent>
          {mutation.isPending ? (
            <>
              <div className="flex items-center gap-3">
                <p>مشخصات</p>
                <Skeleton width={130} height={30} />
                <Skeleton width={130} height={30} />
              </div>
              <Skeleton width={"100%"} height={80} />
            </>
          ) : (
            <>
              {" "}
              <p className="mb-5">
                مشخصات{" "}
                {`${mutation.data?.result.firstName}  ${mutation.data?.result.lastName}`}
              </p>
              <TableContainer component={Paper}>
                <MuiTable
                  sx={{ "& th, & td": { whiteSpace: "nowrap" } }}
                  size="medium"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>بازی</TableCell>
                      <TableCell>ساعت حضور</TableCell>
                      <TableCell>برنده</TableCell>
                      <TableCell>زمان حضور</TableCell>
                      <TableCell>وضعیت حضور</TableCell>
                      <TableCell>کد رهگیری</TableCell>
                      <TableCell>توضیحات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mutation.data?.result.games.map((game) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={game.id}
                      >
                        <TableCell>{game.name}</TableCell>
                        <TableCell>{game.hourPresent || "وارد نشده"}</TableCell>
                        <TableCell>
                          {game.isWinner ? (
                            <IoMdCheckmark className="text-green-600 text-xl" />
                          ) : (
                            <RiCloseLargeFill className="text-red-600 text-xl" />
                          )}
                        </TableCell>
                        <TableCell>
                          {game.timePresent
                            ? gregorianToJalaali(game.timePresent + "Z")
                            : "وارد نشده"}
                        </TableCell>
                        <TableCell>
                          {game.isPresentOnTime === 0 ? (
                            "مسابقه شروع نشده"
                          ) : game.isPresentOnTime === 1 ? (
                            <IoMdCheckmark className="text-green-600 text-xl" />
                          ) : game.isPresentOnTime === 2 ? (
                            <RiCloseLargeFill className="text-red-600 text-xl" />
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell>{game.trackingCode}</TableCell>
                        <TableCell>
                          {game.message ? (
                            <>
                              <Button onClick={() => setDateDialog(true)}>
                                تنظیم تاریخ و ساعت
                              </Button>
                              <Dialog
                                open={dateDialog}
                                onClose={() => setDateDialog(false)}
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
                                        onChange={handleDateChange}
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
                                        onChange={(time) =>
                                          setSelectedtime(time)
                                        }
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
                                        {mutation.data.result.firstName}{" "}
                                        {mutation.data.result.lastName} عزیز ضمن
                                        تشکر بابت ثبت نام شما بازی{" "}
                                        <span className="text-blue-500">
                                          {mutation.data.result.games[0].name}
                                        </span>{" "}
                                        در روز{" "}
                                        <span className="text-green-600">
                                          {gregorianToJalaali(
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
                                        برگذار می شود. و ایران اورجینال منتظر
                                        حضور شما می باشد.
                                      </Typography>
                                    </div>

                                    <Button
                                      disabled={
                                        addCustomerGamingMutation.isPending
                                      }
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
                          ) : (
                            "تاریخ و ساعت در نظر گرفته شده است."
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </MuiTable>
              </TableContainer>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
