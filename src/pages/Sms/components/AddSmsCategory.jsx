import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ThreeDotsLoading from "../../../components/ThreeDotLoading";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SubmitBtn from "../../../components/SubmitBtn";
import { TbCategoryPlus } from "react-icons/tb";
import addSmsCategoryIcon from "./../../../assets/icons/sms/add-category.png";

import { addSMSCategorySchema } from "../../../validations/schemas/panelSms";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@emotion/react";

import { IoClose } from "react-icons/io5";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import { TbArrowBackUp } from "react-icons/tb";
import DialogHeader from "../../../components/DialogHeader";

const token = Cookies.get("token");

export default function AddSMSCategory() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addSMSCategorySchema),
  });

  const submitHandler = async (data) => {
    try {
      const res = await Api.post("/PanelSms/AddNewTextMessage", {
        token,
        ...data,
      });

      setShowSnackbar(true);
      setSnackbarTitle(`دسته بندی ${data.title} افزوده شد.`);
    } catch (error) {
      setShowSnackbar(true);

      if (error.response && error.response.status === 401) {
        setSnackbarTitle(`شما درسترسی لازم به این قسمت را ندارید`);
      } else {
        setSnackbarTitle("خطا در برقراری ارتباط");
      }
    }
  };
  return (
    <div>
      <CategoryBtnBox
        title="افزودن دسته بندی پیام"
        iconSrc={addSmsCategoryIcon}
        onClick={handleClickOpen}
        className="bg-orange-500"
      />
      <Dialog fullScreen={isBelowMd} open={open} onClose={handleClose}>
        <DialogHeader
          title={"افزودن دسته بندی پیام"}
          onClose={handleClose}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <form
              action="#"
              onSubmit={handleSubmit(submitHandler)}
              className=" mx-auto mt-5"
            >
              <TextField
                fullWidth
                className="mb-3"
                id="title"
                label="عنوان"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-400 block mb-2">
                  {errors.title.message}
                </span>
              )}
              <TextField
                fullWidth
                className="mb-3"
                id="text"
                label="متن پیام"
                {...register("text")}
              />
              {errors.text && (
                <span className="text-red-400 block mb-2">
                  {errors.text.message}
                </span>
              )}
              <TextField
                fullWidth
                className="mb-3"
                id="description"
                label="توضیحات"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-400 block mb-2">
                  {errors.description.message}
                </span>
              )}
              <SubmitBtn isSubmitting={isSubmitting} className="bg-orange-500">
                ثبت
              </SubmitBtn>
            </form>
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000}
              onClose={() => setShowSnackbar(false)}
              message={snackbarTitle}
              action={
                <IconButton
                  color="inherit"
                  onClick={() => setShowSnackbar(false)}
                >
                  <IoMdClose />
                </IconButton>
              }
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
