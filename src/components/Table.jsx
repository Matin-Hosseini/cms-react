import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
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
import gregorianToJalaali from "../utils/funcs/gregorianToJalaali";
import { LuMessageSquarePlus } from "react-icons/lu";
import Date from "./Date";

export default function Table({ customers }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDialogRow, setDeleteDialogRow] = useState({});
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [sendSmsDialog, setSendSmsDialog] = useState(false);

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
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        showSnackbar("شما دسترسی لازم به این قسمت را ندارید.");
      }
    }
  };

  const token = Cookies.get("token");

  const mutation = useMutation({
    mutationFn: async (data) => await getCustomerGameDetails(data),
  });

  const showCustomerInfo = async (row) => {
    setDetailsDialog(true);

    mutation.mutate({ token, customer_Id: row.customer_ID });
  };

  const columns = [
    // { field: "id", headerName: "شناسه", width: 70 },
    { field: "firstName", headerName: "نام", width: 130 },
    { field: "lastName", headerName: "نام خانوادگی", width: 180 },
    { field: "phoneNumber", headerName: "شماره موبایل", width: 150 },
    { field: "nationalCode", headerName: "کد ملی", type: "string", width: 120 },
    {
      field: "details",
      headerName: "",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center h-full">
            <Button
              color="primary"
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
    {
      field: "send-sms",
      headerName: "",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center h-full">
            <Button
              color="secondary"
              onClick={() => setSendSmsDialog(true)}
              className="flex items-center gap-2"
            >
              <LuMessageSquarePlus />
              ارسال پیام
            </Button>
          </div>
        );
      },
    },
    // {
    //   field: "actions",
    //   headerName: "",
    //   width: 140,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <div className="flex items-center h-full">
    //         <IconButton
    //           onClick={() => {
    //             setShowDeleteModal(true);
    //             setDeleteDialogRow(params.row);
    //           }}
    //         >
    //           <FaRegTrashAlt className="text-red-500 text-lg" />
    //         </IconButton>

    //         <IconButton onClick={() => sendSMS(params)}>
    //           <BiMessageSquareAdd className="text-green-500 text-lg" />
    //         </IconButton>
    //       </div>
    //     );
    //   },
    // },
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
      >
        <DialogContent>
          <Box>
            {mutation.isPending ? (
              <div>
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={30}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="rectangular" width={"100%"} height={50} />
              </div>
            ) : (
              <>
                <p className="mb-5">
                  مشخطات{" "}
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
                          {console.log(game)}
                          <TableCell>{game.name}</TableCell>
                          <TableCell>
                            {game.hourPresent || "وارد نشده"}
                          </TableCell>
                          <TableCell>
                            {game.isWinner ? (
                              <IoMdCheckmark className="text-green-600 text-xl" />
                            ) : (
                              <RiCloseLargeFill className="text-red-600 text-xl" />
                            )}
                          </TableCell>
                          <TableCell>
                            {game.timePresent
                              ? gregorianToJalaali(game.timePresent)
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
                          <TableCell>{game.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </MuiTable>
                </TableContainer>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={sendSmsDialog}
        onClose={() => setSendSmsDialog(false)}
        maxWidth="xl"
      >
        <DialogContent>
          <Box>
            <Date />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
