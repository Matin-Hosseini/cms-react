import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "../contexts/snackbar";
import { RxEyeOpen } from "react-icons/rx";
import { useTheme } from "@emotion/react";
import { BsSend } from "react-icons/bs";
import CustomerDetails from "../pages/Customers/components/CustomerDetails";
import SendSms from "../pages/Customers/components/SendSms";
import { useAuthContext } from "../contexts/auth";

export default function Table({ customers }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDialogRow, setDeleteDialogRow] = useState({});
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [sendMessageDialog, setSendMessageDialog] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});

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

  const showCustomerInfo = (row) => {
    setDetailsDialog(true);

    setCurrentCustomer(row);
  };

  const sendMessageHandler = async (row) => {
    setSendMessageDialog(true);

    setCurrentCustomer(row);
  };

  const { userInfo } = useAuthContext();

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
      width: userInfo.permissions.some(
        (permission) => permission.permission_Id === 33
      )
        ? 140
        : 0,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {userInfo.permissions.some(
              (permission) => permission.permission_Id === 33
            ) && (
              <>
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
                <div className="flex items-center h-full">
                  <Button
                    color="secondary"
                    onClick={() => sendMessageHandler(params.row)}
                    className="flex items-center gap-2"
                  >
                    <BsSend />
                    ارسال پیام
                  </Button>
                </div>
              </>
            )}
          </>
        );
      },
    },
    {
      field: "send-message",
      headerName: "",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center h-full">
            <Button
              color="secondary"
              onClick={() => sendMessageHandler(params.row)}
              className="flex items-center gap-2"
            >
              <BsSend />
              ارسال پیام
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
      <CustomerDetails
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        customer={currentCustomer}
      />
      <SendSms
        open={sendMessageDialog}
        onClose={() => setSendMessageDialog(false)}
        customer={currentCustomer}
      />
    </>
  );
}
