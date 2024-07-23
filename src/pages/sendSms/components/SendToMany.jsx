import {
  Alert,
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
import { CiViewList } from "react-icons/ci";
import { TbFileSad } from "react-icons/tb";

export default function SendToMany({ disabled, messages }) {
  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [selectBoxTextValue, setSelectBoxTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectBoxValue, setSelectBoxValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async () => {
    setIsSubmitted(true);

    if (!numbers.length) {
      showSnackbar("لطفا ابتدا شماره های مدنظر را وارد کنید.");
      return;
    }
    if (!selectedValue) return;
    setIsSubmitting(true);

    const phoneNumbers = [];
    numbers.forEach((item) => phoneNumbers.push(item?.phoneNumber));
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

    setIsSubmitting(false);
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

  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      const phoneNumber = getValues("phoneNumber");

      const { success } = schema.safeParse({ phoneNumber });
      const isValid = await trigger("phoneNumber");

      if (!isValid) return;

      const newNumber = { id: crypto.randomUUID(), phoneNumber };

      setNumbers((prev) => [...prev, newNumber]);
      setValue("phoneNumber", "");
    }
  };

  return (
    <>
      <div className="my-6 flex flex-col gap-3">
        <Alert severity="success">
          کاربر گرامی برای افزودن شماره مورد نظر بعد از وارد کردن شماره کافیست
          Enter بزنید تا شماره وارد شده به لیست شماره های درج شده ها افزوده شود
        </Alert>
        <Alert severity="error">
          دقت داشته باشید که تنها شماره هایی که در لیست شماره های درج شده قرار
          داشته باشند ارسال خواهد شد.
        </Alert>
      </div>
      <form
        action="#"
        className="max-w-96 mx-auto mt-5 mb-10"
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
          onKeyDown={handleKeyUp}
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
          onClick={submitHandler}
          className="bg-purple-600"
          isSubmitting={isSubmitting}
          disabled={disabled}
          type="button"
        >
          ارسال
        </SubmitBtn>
      </form>

      <div>
        <div className="flex items-center gap-2 text-blue-600">
          <CiViewList className="text-2xl" />
          <h2>شماره های درج شده:</h2>
        </div>

        <ul className="flex justify-center gap-3 flex-wrap my-10">
          {!numbers.length ? (
            <div className="flex items-center justify-center gap-2 text-red-600 border border-dashed border-red-600 max-w-[290px] w-full py-8">
              <TbFileSad className="text-2xl" />
              <h3>هنوز شماره ای درج نکرده اید</h3>
            </div>
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
    </>
  );
}
