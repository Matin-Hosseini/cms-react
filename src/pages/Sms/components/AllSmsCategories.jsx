import { Alert, Box, Button, Dialog, DialogContent } from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import allSmsCategoriesIcon from "./../../../assets/icons/sms/all-categories.png";
import CategoriesTable from "./CategoriesTable";
import DialogHeader from "../../../components/DialogHeader";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import DataTable from "../../../components/DataTable";

import { columns } from "../../../../data/tables/allSmsCategories";
import { useSnackbar } from "../../../contexts/snackbar";
import { useQuery } from "@tanstack/react-query";
import { getSmsCategories } from "../../../services/requests/sms";

const AllSmsCategories = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const token = Cookies.get("token");

  const { data, isPending, error, isFetching, isError } = useQuery({
    queryKey: ["sms-categories"],
    queryFn: async () => await getSmsCategories(token),
    retry: 0,
  });

  if (isFetching) {
    console.log("is fetching");
  }
  if (isPending) {
    console.log("is pending");
  }

  return (
    <div>
      <CategoryBtnBox
        title="دسته بندی های پیامک"
        iconSrc={allSmsCategoriesIcon}
        onClick={handleClickOpen}
        className="bg-violet-400"
      />
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"md"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"دسته بندی های پیامک"}
          onClose={handleClose}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <DataTable columns={columns} rows={rows} custom_ID={"message_ID"} />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllSmsCategories;
