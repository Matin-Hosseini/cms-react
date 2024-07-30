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
import { useMutation } from "@tanstack/react-query";
import { getUserInformation } from "../../../services/requests/users";
import { useSnackbar } from "../../../contexts/snackbar";
import { getUserInformationSchema } from "../../../validations/schemas/user";

const UserInformation = () => {
  const [open, setOpen] = useState(false);

  const { showSnackbar } = useSnackbar();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getUserInformationSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await getUserInformation(data),
    onSuccess: (data) => {
      if (data.status === 404) {
        showSnackbar("کاربری یافت نشد.", "error");
      }
    },
  });

  const submitHandler = async ({ userName }) => {
    const token = Cookies.get("token");

    mutation.mutate({ token, userName });
  };

  return (
    <>
      <CategoryBtnBox
        title="اطلاعات کاربر"
        iconSrc={userInformationIcon}
        onClick={() => setOpen(true)}
        className="bg-zinc-400"
      />
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={"md"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"دریافت اطلاعات کاربر"}
          onClose={() => setOpen(false)}
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

            {mutation.data?.status === 200 && (
              <UserInfoCard {...mutation.data.result} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserInformation;
