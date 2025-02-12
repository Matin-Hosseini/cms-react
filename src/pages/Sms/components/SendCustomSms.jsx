import { z } from "zod";
import { sendSmsToAnyoneSchema } from "../../../validations/schemas/panelSms";
import { TextField } from "@mui/material";
import SubmitBtn from "../../../components/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSmsToAnyone } from "../../../services/requests/sms";

const SendCustomSms = ({ disabled, messages }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sendSmsToAnyoneSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await sendSmsToAnyone(data),
    onSuccess: async (data) => {
      showSnackbar("پیام ارسال شد.");
      console.log(data);
      queryClient.invalidateQueries("sent-messages");
      reset();
    },
    onError: (error) => {
      console.log("onError", error);
      showSnackbar("خطا در ارسال اطلاعات", "error");
    },
  });

  const submitHandler = async ({ text, phoneNumber }) => {
    const requestData = {
      token,
      text,
      phoneNumber,
    };
    mutation.mutate(requestData);
  };
  return (
    <form action="#" onSubmit={handleSubmit(submitHandler)} className="mt-5">
      <TextField
        fullWidth
        className="mb-3"
        id="phone"
        label="شماره موبایل"
        {...register("phoneNumber")}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />
      <TextField
        fullWidth
        className="mb-3"
        id="text"
        label="متن پیام"
        {...register("text")}
        multiline
        rows={4}
        error={!!errors.text}
        helperText={errors.text?.message}
      />

      <SubmitBtn isSubmitting={mutation.isPending} disabled={disabled}>
        ارسال
      </SubmitBtn>
    </form>
  );
};

export default SendCustomSms;
