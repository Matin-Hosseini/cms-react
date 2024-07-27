import { Alert, Box, Dialog, DialogContent } from "@mui/material";
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

  const { showSnackbar } = useSnackbar();

  const token = Cookies.get("token");

  useEffect(() => {
    const getAllMessageCategories = async () => {
      try {
        const res = await Api.post("/PanelSms/GetAllTextMessage", { token });

        setRows(res.data.result.messages);
      } catch (error) {
        // if (error.response && error.response.status === 401) {
        //   showSnackbar(`شما درسترسی لازم به این قسمت را ندارید`);
        // } else {
        showSnackbar("خطا در برقراری ارتباط");
        // }
      }
    };

    getAllMessageCategories();
  }, []);

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
