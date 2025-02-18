import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import addSmsCategoryIcon from "./../../../assets/icons/sms/add-category.png";

import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@emotion/react";

import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import SmsCategoryForm from "./SmsCategoryForm";

const token = Cookies.get("token");

export default function AddSMSCategory() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <CategoryBtnBox
        title="افزودن دسته بندی پیام"
        iconSrc={addSmsCategoryIcon}
        onClick={() => setOpen(true)}
        className="bg-orange-500"
      />
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={"sm"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"افزودن دسته بندی پیام"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <SmsCategoryForm />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
