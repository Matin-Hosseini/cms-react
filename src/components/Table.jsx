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
  Snackbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";

export default function Table({ customers }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDialogRow, setDeleteDialogRow] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
        setSnackbarMessage("شما دسترسی لازم به این قسمت را ندارید.");
        setShowSnackbar(true);
      }
    }
  };

  const columns = [
    // { field: "id", headerName: "شناسه", width: 70 },
    { field: "firstName", headerName: "نام", width: 130 },
    { field: "lastName", headerName: "نام خانوادگی", width: 180 },
    {
      field: "phoneNumber",
      headerName: "شماره موبایل",
      width: 150,
      editable: true,
    },
    { field: "nationalCode", headerName: "کد ملی", type: "string", width: 120 },
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
      {console.log(customers.length)}
      <div style={{ height: 600, width: "100%" }}>
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
          pageSizeOptions={[5, 10]}
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        action={
          <IconButton color="inherit" onClick={() => setShowSnackbar(false)}>
            <IoMdClose />
          </IconButton>
        }
      />
    </>
  );
}
