import { z } from "zod";
import {
  sendSMSSchema,
  sendSmsToAnyoneSchema,
} from "../../../validations/schemas/panelSms";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SubmitBtn from "../../../components/SubmitBtn";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { phoneRegex } from "../../../utils/regexs";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import Api from "../../../axios/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendSmsToAnyone } from "../../../services/requests/sms";

const SendToSingle = ({ disabled, messages }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectBoxTextValue, setSelectBoxTextValue] = useState("");
  const [selectBoxValue, setSelectBoxValue] = useState("");

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    setValue,
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

  const submitHandler = async (data) => {
    if (!selectedValue) return;

    const requestData = {
      token,
      text: selectedValue,
      phoneNumber: data.phoneNumber,
    };

    mutation.mutate(requestData);
  };
  return (
    <form
      action="#"
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-96 mx-auto mt-5"
    >
      <FormControl fullWidth className="mb-3">
        <InputLabel id="message-category">دسته بندی</InputLabel>
        <Select
          labelId="message-category"
          id="messega-cateogyr-select"
          value={selectBoxValue}
          label="دسته بندی"
          onChange={(e) => setSelectBoxValue(e.target.value)}
        >
          {messages.map((message) => (
            <MenuItem
              value={message.text}
              onClick={() => {
                setSelectedValue(message.text);
              }}
              key={Math.random()}
            >
              {message.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isSubmitted && !selectedValue && (
        <span className="text-red-400 block mb-2 text-xs">
          لطفا یک دسته بندی را انتخاب کنید.
        </span>
      )}
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
