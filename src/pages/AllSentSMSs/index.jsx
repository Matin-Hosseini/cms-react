import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../axios/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteDialog from "../../components/DeleteDialog";
import { IconButton, Snackbar } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { faIR } from "@mui/x-data-grid/locales";
import gregorianToJalaali from "../../utils/funcs/gregorianToJalaali";
import { useSnackbar } from "../../contexts/snackbar";

const AllSentSMSs = () => {
  const [allMessages, setAllMessages] = useState([]);
  const token = Cookies.get("token");

  const { showSnackbar } = useSnackbar();

  const columns = [
    { field: "phoneNumber", headerName: "شماره تلفن", width: 130 },
    { field: "whenSent", headerName: "تاریخ ارسال", width: 180 },
    { field: "text", headerName: "متن پیام", width: 300 },
  ];

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const res = await Api.post("/PanelSms/ShowAllPostedSmsLog", { token });

        console.log(res.data.result.postedSmsLogs);
        const newData = res.data.result.postedSmsLogs.map((row) => ({
          ...row,
          whenSent: gregorianToJalaali(row.whenSent),
        }));
        setAllMessages(newData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          showSnackbar(`شما درسترسی لازم به این قسمت را ندارید`);
        } else {
          showSnackbar("خطا در برقراری ارتباط");
        }
      }
    };

    getAllMessages();
  }, []);
  return (
    <>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
          rows={allMessages}
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
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          // onRowSelectionModelChange={handleSelectionChange}
          // experimentalFeatures={{ newEditingApi: true }}
          // processRowUpdate={processRowUpdate}
        />

        {/* <DeleteDialog
          show={showDeleteModal}
          onDialogClose={() => setShowDeleteModal(false)}
          row={deleteDialogRow}
          onDelete={deleteCustomer}
        /> */}
      </div>
      {/* <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        action={
          <IconButton color="inherit" onClick={() => setShowSnackbar(false)}>
            <IoMdClose />
          </IconButton>
        }
      /> */}
    </>
  );
};

export default AllSentSMSs;
