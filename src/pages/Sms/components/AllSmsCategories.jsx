import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tabs,
} from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import allSmsCategoriesIcon from "./../../../assets/icons/sms/all-categories.png";
import CategoriesTable from "./CategoriesTable";
import DialogHeader from "../../../components/DialogHeader";

const AllSmsCategories = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <CategoryBtnBox
        title="دسته بندی های پیامک"
        iconSrc={allSmsCategoriesIcon}
        onClick={handleClickOpen}
        className="bg-violet-400"
      />
      <Dialog fullScreen={isBelowMd} open={open} onClose={handleClose}>
        <DialogHeader
          title={"دسته بندی های پیامک"}
          onClose={handleClose}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Alert color="warning" sx={{ mb: 4 }}>
              این جدول تستی می باشد.
            </Alert>
            <CategoriesTable />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllSmsCategories;
