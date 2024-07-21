import { z } from "zod";
import { sendSMSSchema } from "../../../validations/schemas/panelSms";
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

const SendToSingle = ({ disabled, messages }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectBoxTextValue, setSelectBoxTextValue] = useState("");
  const [selectBoxValue, setSelectBoxValue] = useState("");

  const token = Cookies.get("token");

  const { showSnackbar } = useSnackbar();

  const schema = z.object({
    phoneNumber: z
      .string()
      .min(1, "لطفا شماره موبایل را وارد کنید.")
      .regex(phoneRegex, "شماره موبایل نامعتبر می باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data) => {
    if (!selectedValue) return;

    const obj = {
      token,
      text: selectedValue,
      phoneNumber: data.phoneNumber,
    };
    console.log(obj);

    try {
      const res = await Api.post("/PanelSms/SendSmsToAnyOne", {
        token,
        text: selectedValue,
        phoneNumber: data.phoneNumber,
      });

      console.log(res.data);

      showSnackbar("پیام ارسال شد.");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        showSnackbar(`شما درسترسی لازم به این قسمت را ندارید`);
      } else {
        showSnackbar("خطا در برقراری ارتباط");
      }
    }
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
        disabled={disabled}
      />
      {errors.phoneNumber && (
        <span className="text-red-400 block mb-2 text-xs">
          {errors.phoneNumber.message}
        </span>
      )}

      <SubmitBtn isSubmitting={isSubmitting} disabled={disabled}>
        ارسال
      </SubmitBtn>
    </form>
  );
};

export default SendToSingle;
