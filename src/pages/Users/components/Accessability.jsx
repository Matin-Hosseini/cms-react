import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../../../services/requests/role";
import { useAuthContext } from "../../../contexts/auth";
import DataTable from "../../../components/DataTable";
import { IoAccessibilitySharp } from "react-icons/io5";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import DialogHeader from "../../../components/DialogHeader";
import { useTheme } from "@emotion/react";

import { useState } from "react";

export default function Accessability() {
  const [open, setOpen] = useState(false);

  const { token } = useAuthContext();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await getAllRoles(token),
  });

  if (data) {
    console.log(data);
  }

  const columns = [
    { field: "id", headerName: "شناسه", width: 80 },
    { field: "name", headerName: "نقش", width: 150 },
    { field: "description", headerName: "توضیحات", width: 400 },
    {
      field: "actions",
      headerName: "عملیات",
      width: 200,
      renderCell: (params) => {
        const handleDelete = async () => {};

        return (
          <>
            <Button
              color="info"
              startIcon={<IoAccessibilitySharp />}
              onClick={() => setOpen(true)}
            >
              دسترسی ها
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        {data && (
          <DataTable
            columns={columns}
            rows={data.result.roles}
            custom_ID={"id"}
          />
        )}
      </div>
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={"xl"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"دسته بندی های پیامک"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box sx={{ width: "100%" }}></Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
