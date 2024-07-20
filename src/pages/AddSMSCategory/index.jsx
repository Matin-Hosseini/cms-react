import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ThreeDotsLoading from "../../components/ThreeDotLoading";
import Api from "../../axios/api";
import Cookies from "js-cookie";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const schema = z.object({
  title: z.string().min(1, "عنوان الزامی است."),
  text: z.string().min(1, "متن پیام الزامی است."),
  description: z.string(),
});
const token = Cookies.get("token");

export default function AddSMSCategory() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data) => {
    try {
      const res = await Api.post("/PanelSms/AddNewTextMessage", {
        token,
        ...data,
      });

      setShowSnackbar(true);
      setSnackbarTitle(`دسته بندی ${data.title} افزوده شد.`);
    } catch (error) {
      setShowSnackbar(true);

      if (error.response && error.response.status === 401) {
        setSnackbarTitle(`شما درسترسی لازم به این قسمت را ندارید`);
      }else{
        setSnackbarTitle("خطا در برقراری ارتباط")
      }
    }
  };
  return (
    <>
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
        />
        {errors.title && (
          <span className="text-red-400 block mb-2">
            {errors.title.message}
          </span>
        )}
        <TextField
          fullWidth
          className="mb-3"
          id="text"
          label="متن پیام"
          {...register("text")}
        />
        {errors.text && (
          <span className="text-red-400 block mb-2">{errors.text.message}</span>
        )}
        <TextField
          fullWidth
          className="mb-3"
          id="description"
          label="توضیحات"
          {...register("description")}
        />
        <Button
          variant="contained"
          type="submit"
          className="w-full h-12 flex items-center justify-center bg-gray-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? <ThreeDotsLoading /> : "ثبت"}
        </Button>
      </form>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarTitle}
        action={
          <IconButton color="inherit" onClick={() => setShowSnackbar(false)}>
            <IoMdClose />
          </IconButton>
        }
      />
    </>
  );
}
