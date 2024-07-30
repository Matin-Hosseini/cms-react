import { Alert, Box, Dialog, DialogContent, TextField } from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import addUserIcon from "./../../../assets/images/icons/add-user.png";
import DialogHeader from "../../../components/DialogHeader";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import SubmitBtn from "../../../components/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import { addUserSchema } from "../../../validations/schemas/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../../services/requests/users";

const AddUser = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const mutation = useMutation({
    mutationFn: async (data) => await addUser(data),
    onSuccess: (data) => {
      console.log(data);
      showSnackbar("کاربر جدید افزوده شد.");

      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      showSnackbar("خطا در ارسال اطلاعات.", "error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addUserSchema) });

  const submitHandler = async (data) => {
    mutation.mutate({
      token,
      ...data,
      role_ID: 0,
    });
  };

  return (
    <>
      <CategoryBtnBox
        title="افزودن کاربر جدید"
        iconSrc={addUserIcon}
        onClick={() => setOpen(true)}
        className="bg-neutral-400"
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
          title={"افزودن کاربر جدید"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <Alert color="warning" sx={{ mb: 2 }}>
              این بخش در حال تکمیل می باشد.
            </Alert>
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
              <SubmitBtn isSubmitting={mutation.isPending}>
                افزودن کاربر
              </SubmitBtn>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUser;
