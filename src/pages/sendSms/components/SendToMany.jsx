import {
  Chip,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SubmitBtn from "../../../components/SubmitBtn";
import { useForm } from "react-hook-form";
import { phoneRegex } from "../../../utils/regexs";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { z } from "zod";
import Api from "../../../axios/api";
import { useSnackbar } from "../../../contexts/snackbar";

export default function SendToMany({ disabled, messages }) {
  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [selectBoxTextValue, setSelectBoxTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
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
    setValue,
    trigger,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const submitHandler = async (data) => {
    const phoneNumbers = [];
    numbers.forEach((item) => phoneNumbers.push(item?.phoneNumber));
    console.log(selectedValue);
    console.log(phoneNumbers);

    try {
      const res = await Api.post("/PanelSms/SendListSmsToAnyOne", {
        token,
        phoneNumbers,
        text: selectedValue,
      });
      console.log(res.data);

      showSnackbar("پیام ارسال شد.");

      setNumbers([]);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        showSnackbar(`شما درسترسی لازم به این قسمت را ندارید`);
      } else {
        showSnackbar("خطا در برقراری ارتباط");
      }
    }
  };

  const handleDelete = (id) => {
    setNumbers((prev) => prev.filter((number) => number.id !== id));
  };

  const addNumber = async (value) => {
    if (!value.includes("/")) return;

    const isValid = await trigger("phoneNumber");
    if (!isValid) return;

    const phoneNumber = value.split("/")[0];
    console.log(phoneNumber);
    const newNumber = { id: crypto.randomUUID(), phoneNumber };

    setNumbers((prev) => [...prev, newNumber]);
    setValue("phoneNumber", "");
  };

  return (
    <>
      <form
        action="#"
        className="max-w-96 mx-auto mt-5"
        onSubmit={handleSubmit(submitHandler)}
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
          disabled={disabled}
          fullWidth
          className="mb-3"
          id="phone"
          label="شماره موبایل"
          {...register("phoneNumber", {
            onChange: (e) => {
              addNumber(e.target.value);
            },
          })}
        />
        {errors.phoneNumber && (
          <span className="text-red-400 block mb-2 text-xs">
            {errors.phoneNumber.message}
          </span>
        )}
        <SubmitBtn
          className="bg-blue-600"
          isSubmitting={isSubmitting}
          disabled={disabled}
        >
          ارسال
        </SubmitBtn>
      </form>

      <div>
        <h2>شماره های درج شده:</h2>

        <ul className="flex justify-center gap-3 flex-wrap">
          {!numbers.length ? (
            <div>هنوز شماره ای درج نکرده اید.</div>
          ) : (
            numbers.map((number) => (
              <li key={number.id}>
                <Chip
                  label={number.phoneNumber}
                  onDelete={() => handleDelete(number.id)}
                />
              </li>
            ))
          )}
        </ul>
      </div>

      <p className="bg-yellow-100 text-yellow-600 mt-10">
        کاربر گرامی برای افزودن هر شماره بعد از وارد کردن آن از / استفاده کنید
        تا در لیست درج شده ها نمایش داده شود.
      </p>
      <p className="text-red-600 bg-red-100">
        کاربر گرامی اعتبار سنجی ها در حال حاظر به طور کامل انجام نشده است لطفا
        اطلاعات درست را وارد کنید.
      </p>
    </>
  );
}
