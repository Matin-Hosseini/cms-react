import { z } from "zod";
import {
  sendCallCenterSmsSchema,
  sendSMSSchema,
  sendSmsToAnyoneSchema,
} from "../../../validations/schemas/panelSms";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SubmitBtn from "../../../components/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendCallCenterSms } from "../../../services/requests/sms";

const SendSalesPdfSms = ({ disabled, messages }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sendCallCenterSmsSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await sendCallCenterSms(data),
    onSuccess: async () => {
      showSnackbar("پیام ارسال شد.");
      queryClient.invalidateQueries("sent-messages");
      reset();
    },
    onError: (error) => {
      console.log("onError", error);
      showSnackbar("خطا در ارسال اطلاعات", "error");
    },
  });

  const submitHandler = async (data) => {
    const requestData = { token, ...data };

    mutation.mutate(requestData);
  };
  return (
    <>
      <form
        action="#"
        onSubmit={handleSubmit(submitHandler)}
        className="max-w mx-auto mt-5"
      >
        <TextField
          fullWidth
          className="mb-3"
          id="firstName"
          label="نام"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          fullWidth
          className="mb-3"
          id="lastName"
          label="نام خانوادگی"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          fullWidth
          className="mb-3"
          id="phone"
          label="شماره موبایل"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <SubmitBtn isSubmitting={mutation.isPending} disabled={true}>
          ارسال
        </SubmitBtn>
      </form>
      <Alert severity="warning" className="mt-10">
        این بخش در حال توسعه بوده و پس از تکمیل فرایند امکان ارسال پیام فراهم
        خواهد شد.
      </Alert>
    </>
  );
};

export default SendSalesPdfSms;
