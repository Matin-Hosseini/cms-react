import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import { useState } from "react";
import SubmitBtn from "../../../components/SubmitBtn";
import addSmsCategoryIcon from "./../../../assets/icons/sms/add-category.png";

import { addSMSCategorySchema } from "../../../validations/schemas/panelSms";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@emotion/react";

import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSmsCategory } from "../../../services/requests/sms";
import { useSnackbar } from "../../../contexts/snackbar";

const token = Cookies.get("token");

export default function AddSMSCategory() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addSMSCategorySchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await addSmsCategory(data),
    onSuccess: (_, variables) => {
      showSnackbar(`دسته بندی ${variables.title} افزوده شد.`);
      queryClient.invalidateQueries(["sms-categories"]);
      reset();
    },
    onError: (error) => {
      console.log(error);
      showSnackbar("خطا در ارسال اطلاعات.", "error");
    },
  });

  const submitHandler = async (data) => {
    mutation.mutate({ token, ...data });
  };

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
        maxWidth={"md"}
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
            <form
              action="#"
              onSubmit={handleSubmit(submitHandler)}
              className="max-w-96 mx-auto mt-5"
            >
              <TextField
                fullWidth
                className="mb-3"
                id="title"
                label="عنوان"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                fullWidth
                className="mb-3"
                id="text"
                label="متن پیام"
                {...register("text")}
                error={!!errors.text}
                helperText={errors.text?.message}
              />

              <TextField
                fullWidth
                className="mb-3"
                id="description"
                label="توضیحات"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <SubmitBtn
                isSubmitting={mutation.isPending}
                className="bg-orange-500"
              >
                ثبت
              </SubmitBtn>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
