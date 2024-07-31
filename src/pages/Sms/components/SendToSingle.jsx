import { z } from "zod";
import {
  sendSMSSchema,
  sendSmsToAnyoneSchema,
} from "../../../validations/schemas/panelSms";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SubmitBtn from "../../../components/SubmitBtn";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { phoneRegex } from "../../../utils/regexs";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import Api from "../../../axios/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendSmsToAnyone } from "../../../services/requests/sms";

const SendToSingle = ({ disabled, messages }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(sendSmsToAnyoneSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await sendSmsToAnyone(data),
    onSuccess: async () => {
      showSnackbar("پیام ارسال شد.");
      queryClient.invalidateQueries("sent-messages");
      setValue("phoneNumber", "");
    },
    onError: () => {
      console.log("onError");
      showSnackbar("خطا در ارسال اطلاعات", "error");
    },
  });

  const submitHandler = async ({ phoneNumber, text }) => {
    const requestData = {
      token,
      text,
      phoneNumber,
    };

    mutation.mutate(requestData);
  };
  return (
    <form
      action="#"
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-96 mx-auto mt-5"
    >
      <FormControl fullWidth className="mb-3" error={!!errors.text}>
        <InputLabel id="message-category">دسته بندی</InputLabel>
        <Controller
          name="text"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Select labelId="message-category" label="دسته بندی" {...field}>
              {messages.map((message) => (
                <MenuItem value={message.text} key={Math.random()}>
                  {message.title}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{!!errors.text && errors.text.message}</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        className="mb-3"
        id="phone"
        label="شماره موبایل"
        {...register("phoneNumber")}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />

      <SubmitBtn isSubmitting={mutation.isPending} disabled={disabled}>
        ارسال
      </SubmitBtn>
    </form>
  );
};

export default SendToSingle;
