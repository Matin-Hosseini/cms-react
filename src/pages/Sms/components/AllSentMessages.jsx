import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../axios/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import DeleteDialog from "../../components/DeleteDialog";
import { faIR } from "@mui/x-data-grid/locales";
import gregorianToJalaali from "./../../../utils/funcs/gregorianToJalaali";
import { useSnackbar } from "../../../contexts/snackbar";
import { useQuery } from "@tanstack/react-query";
import { sentMessages } from "../../../services/requests/sms";

const AllSentMessages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const token = Cookies.get("token");

  const { showSnackbar } = useSnackbar();

  const columns = [
    { field: "phoneNumber", headerName: "شماره تلفن", width: 130 },
    { field: "whenSent", headerName: "تاریخ ارسال", width: 180 },
    { field: "whoSent", headerName: "فرستنده", width: 150 },
    { field: "text", headerName: "متن پیام", width: 2500 },
  ];

  const { data, isFetching, isError, isPending, error, isLoading } = useQuery({
    queryKey: ["sent-messages"],
    queryFn: () => sentMessages(token),
  });

  const messages = data?.result.postedSmsLogs.map((row) => ({
    ...row,
    whenSent: gregorianToJalaali(row.whenSent),
  }));

  if (isFetching) {
    console.log("sent messeges is fetching");
  }
  console.log(data);

  return (
    <>
      <h2 className="mb-4">پیام های ارسال شده</h2>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
          rows={messages || []}
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

export default AllSentMessages;
