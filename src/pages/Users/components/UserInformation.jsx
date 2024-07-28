import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import SubmitBtn from "../../../components/SubmitBtn";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import userInformationIcon from "./../../../assets/images/icons/user-information.webp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import UserInfoCard from "./UserInfoCard";

const UserInformation = () => {
  const [userInfo, setUserInfo] = useState(null);

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
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async ({ userName }) => {
    const token = Cookies.get("token");
    try {
      const res = await Api.post("/User/GetUserInformation", {
        token,
        userName,
      });
      console.log(res);
      setUserInfo(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CategoryBtnBox
        title="اطلاعات کاربر"
        iconSrc={userInformationIcon}
        onClick={handleClickOpen}
        className="bg-zinc-400"
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
          title={"دریافت اطلاعات کاربر"}
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

              <SubmitBtn isSubmitting={isSubmitting}>مشاهده</SubmitBtn>
            </form>

            {userInfo && <UserInfoCard {...userInfo} />}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserInformation;
