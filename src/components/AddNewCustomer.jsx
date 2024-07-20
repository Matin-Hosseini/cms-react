import { useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { newCustomerSchema } from "./../validations/schemas/customer";

const AddNewCustomer = () => {
  const [showDialog, setshowDialog] = useState(false);

  const addNewCustomerShema = z.object(newCustomerSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addNewCustomerShema),
  });

  const handleDialogClose = () => {
    setshowDialog(false);
    reset();
  };

  const submitHandler = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Button
        startIcon={<RiUserAddLine />}
        className="mb-5"
        onClick={() => setshowDialog(true)}
      >
        افزودن مشتری جدید
      </Button>
      <Dialog
        sx={{ "& .MuiPaper-root": { width: "500px" } }}
        open={showDialog}
        onClose={() => setshowDialog(false)}
      >
        <DialogTitle>افزودن مشتری جدید</DialogTitle>
        <DialogContent>
          <form action="#" onSubmit={handleSubmit(submitHandler)}>
            <TextField
              className="mb-2 w-full"
              label="نام"
              variant="standard"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-400">{errors.firstName.message}</span>
            )}
            <TextField
              className="mb-2 w-full"
              label="نام خانوادگی"
              variant="standard"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-red-400">{errors.lastName.message}</span>
            )}
            <TextField
              className="mb-2 w-full"
              label="شماره موبایل"
              variant="standard"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-400">{errors.phoneNumber.message}</span>
            )}
            <TextField
              className="mb-2 w-full"
              label="کد ملی"
              variant="standard"
              {...register("nationalCode")}
            />
            {errors.nationalCode && (
              <span className="text-red-400">
                {errors.nationalCode.message}
              </span>
            )}

            <div className="mt-3 flex items-center justify-end gap-2">
              <Button
                color="error"
                variant="outlined"
                onClick={handleDialogClose}
              >
                لغو
              </Button>
              <Button color="primary" variant="contained" type="submit">
                ثبت
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewCustomer;
