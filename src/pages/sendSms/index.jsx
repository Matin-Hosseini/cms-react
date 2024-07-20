import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../axios/api";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import { BiSad } from "react-icons/bi";
import ThreeDotsLoading from "../../components/ThreeDotLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { phoneRegex } from "../../utils/regexs";

export default function SendSms() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [notAuthorized, setNotAuthorized] = useState(false);
  const [selectBoxValue, setSelectBoxValue] = useState("");
  const [selectBoxTextValue, setSelectBoxTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [messages, setMessages] = useState([]);
  const token = Cookies.get("token");

  const schema = z.object({
    phoneNumber: z
      .string()
      .min(1, "شماره موبایل الزامی است.")
      .regex(phoneRegex, "شماره موبایل معتبر نمی باشد."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const getSmsCategories = async () => {
    try {
      const res = await Api.post("/PanelSms/GetAllTextMessage", { token });
      console.log(res);

      setMessages(res.data.result.messages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setNotAuthorized(true);
      } else {
        setSnackbarTitle("خطا در برقراری ارتباط");
      }
    }
  };

  useEffect(() => {
    getSmsCategories();
  }, []);
  const submitHandler = async (data) => {
    if (!selectedValue) return;

    try {
      const res = await Api.post("/PanelSms/SendSmsToAnyOne", {
        token,
        text: selectedValue,
        phoneNumber: data.phoneNumber,
      });

      setShowSnackbar(true);
      setSnackbarTitle("پیام ارسال شد.");
    } catch (error) {
      setShowSnackbar(true);

      if (error.response && error.response.status === 401) {
        setSnackbarTitle(`شما درسترسی لازم به این قسمت را ندارید`);
      } else {
        setSnackbarTitle("خطا در برقراری ارتباط");
      }
    }
  };

  return (
    <>
      {notAuthorized ? (
        <div className="border border-dashed border-red-400 text-red-400 h-24 flex items-center justify-center">
          <BiSad className="text-[2rem] ml-3" />
          <p>شما دسترسی لازم به این صفحه را ندارید.</p>
        </div>
      ) : (
        <>
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
              <span className="text-red-400 block mb-2">
                لطفا یک گزینه را انتخاب کنید.
              </span>
            )}

            <TextField
              fullWidth
              className="mb-3"
              id="phone"
              label="شماره موبایل"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-400 block mb-2">
                {errors.phoneNumber.message}
              </span>
            )}

            <Button
              variant="contained"
              type="submit"
              className="w-full h-12 flex items-center justify-center bg-gray-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? <ThreeDotsLoading /> : "ارسال"}
            </Button>
          </form>

          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            message={snackbarTitle}
            action={
              <IconButton
                color="inherit"
                onClick={() => setShowSnackbar(false)}
              >
                <IoMdClose />
              </IconButton>
            }
          />
        </>
      )}
    </>
  );
}
