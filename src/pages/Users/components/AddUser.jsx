import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import addUserIcon from "./../../../assets/images/icons/add-user.jpg";
import DialogHeader from "../../../components/DialogHeader";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitBtn from "../../../components/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "../../../axios/api";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";

const AddUser = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const schema = z.object({
    userName: z.string().min(1, "نام کاربری الزامی است."),
    password: z.string().min(1, "رمز عبور الزامی است."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const { showSnackbar } = useSnackbar();

  const token = Cookies.get("token");

  const submitHandler = async (data) => {
    try {
      const res = await Api.post("/User/AddUser", {
        token,
        ...data,
        role_ID: 0,
      });

      console.log(res);
      showSnackbar("کاربر افزوده شد.");
    } catch (error) {
      console.log(error);
      showSnackbar("خطا در برقراری ارتباط");
    }
  };

  return (
    <>
      <CategoryBtnBox
        title="افزودن کاربر جدید"
        iconSrc={addUserIcon}
        onClick={handleClickOpen}
        className="bg-green-700"
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
          title={"افزودن کاربر جدید"}
          onClose={handleClose}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <form
              action="#"
              className=""
              onSubmit={handleSubmit(submitHandler)}
            >
              <TextField
                fullWidth
                className="mb-3"
                id="userName"
                label="نام کاربری"
                {...register("userName")}
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
              <TextField
                fullWidth
                className="mb-3"
                id="password"
                label="رمز عبور"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <SubmitBtn isSubmitting={isSubmitting}>افزودن کاربر</SubmitBtn>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUser;
