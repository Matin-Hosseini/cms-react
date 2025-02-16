import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../axios/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import gregorianToJalaali from "./../../../utils/funcs/gregorianToJalaali";
import { useSnackbar } from "../../../contexts/snackbar";
import { useQuery } from "@tanstack/react-query";
import { sentMessages } from "../../../services/requests/sms";
import TableSkeleton from "../../../components/Skeletons/TableSkeleton";

const AllSentMessages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const token = Cookies.get("token");

  const columns = [
    { field: "phoneNumber", headerName: "شماره تلفن", width: 130 },
    { field: "whenSent", headerName: "تاریخ ارسال", width: 180 },
    { field: "whoSent", headerName: "فرستنده", width: 150 },
    { field: "text", headerName: "متن پیام", width: 2500 },
  ];

  const { data, isError, isPending, error, isSuccess } = useQuery({
    queryKey: ["sent-messages"],
    queryFn: () => sentMessages(token),
  });

  if (data) {
    console.log(
      data.result.postedSmsLogs.filter(
        (item) => item.whoSent === "javad_yousefi"
      )
    );
  }

  const messages = data?.result.postedSmsLogs.map((row) => ({
    ...row,
    whenSent: gregorianToJalaali(row.whenSent),
  }));

  return (
    <>
      <h2 className="mb-4">پیام های ارسال شده</h2>
      {isPending && <TableSkeleton />}
      {isSuccess && (
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            rows={messages || []}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
            }}
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
            pageSizeOptions={[5, 10, 15, 20, 30, 40]}
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
      )}
    </>
  );
};

export default AllSentMessages;
