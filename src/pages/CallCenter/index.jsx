import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import { useQuery } from "@tanstack/react-query";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Button } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { useAuthContext } from "../../contexts/auth";
import { getCallCenterCustomers } from "../../services/requests/callCenter";

import ExcelJs from "exceljs";
import gregorianToJalaali from "../../utils/funcs/gregorianToJalaali";
import { descending } from "../../utils/funcs/sort";

export default function CallCenter() {
  const { token } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["callCenterCustomers"],
    queryFn: async () => await getCallCenterCustomers(token),
  });

  if (data) {
    console.log(data);
    data.result.callCenterCustomers = data.result.callCenterCustomers.map(
      (item) => ({
        ...item,
        dateTime: gregorianToJalaali(item.dateTime),
      })
    );
    data.result.callCenterCustomers = descending(
      data.result.callCenterCustomers,
      "customerId"
    );
  }

  const columns = [
    // { field: "id", headerName: "شناسه", width: 70 },
    { field: "fullName", headerName: "نام و نام خانوادگی", width: 200 },
    { field: "phoneNumber", headerName: "شماره موبایل", width: 150 },
    {
      field: "verify",
      headerName: "احراز شده",
      type: "string",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center text-xl h-full">
            {params.row.verify ? (
              <IoCheckmark className="text-green-500" />
            ) : (
              <RxCross1 className="text-red-500" />
            )}
          </div>
        );
      },
    },
    { field: "dateTime", headerName: "تاریخ ثبت", type: "string", width: 190 },
  ];

  const exportExcelFile = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: "شناسه",
        key: "customerId",
        width: 10,
      },
      {
        header: "نام و نام خانوادگی",
        key: "fullName",
        width: 20,
      },
      {
        header: "شماره موبایل",
        key: "phoneNumber",
        width: 20,
      },
      {
        header: "احراز شده",
        key: "verify",
        width: 20,
      },
      {
        header: "تاریخ",
        key: "dateTime",
        width: 80,
      },
    ];

    data?.result.callCenterCustomers.map((customer) => {
      sheet.addRow({
        customerId: customer?.customerId,
        fullName: customer.fullName,
        phoneNumber: customer.phoneNumber,
        verify: customer.verify,
        dateTime: customer.dateTime,
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <div className="mb-4">
        <Button
          onClick={exportExcelFile}
          startIcon={<FiDownload />}
          sx={{ paddingX: "2rem" }}
          variant="contained"
        >
          دانلود
        </Button>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell:focus": { outline: "none" },
            height: "100%",
          }}
          rows={data?.result.callCenterCustomers || []}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            // sorting: {
            //   sortModel: [{ field: "dateTime", sort: "desc" }],
            // },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 15, 20, 30, 40]}
          checkboxSelection
          disableRowSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) => row.customerId}
        />
      </div>

      <div>heelo </div>
    </>
  );
}
