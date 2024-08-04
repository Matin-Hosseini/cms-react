import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DialogHeader from "../../../components/DialogHeader";
import { Controller, useForm } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSmsCategories,
  sendSmsToAnyone,
} from "../../../services/requests/sms";
import Cookies from "js-cookie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../../../components/SubmitBtn";
import { useSnackbar } from "../../../contexts/snackbar";

const SendSms = ({ open, onClose, customer }) => {
  const token = Cookies.get("token");

  const queryClient = useQueryClient();
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));
  const { showSnackbar } = useSnackbar();

  const { data } = useQuery({
    queryKey: ["sms-categories"],
    queryFn: async () => await getSmsCategories(token),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await sendSmsToAnyone(data),
    onSuccess: async () => {
      showSnackbar(
        `پیام به ${customer.firstName} ${customer.lastName} ارسال شد.`
      );

      onClose();

      queryClient.invalidateQueries("sent-messages");
    },
    onError: () => {
      showSnackbar("خطا در ارسال اطلاعات", "error");
    },
  });

  const shema = z.object({
    text: z.string().min(1, "لطفا دسته بندی پیام را وارد کنید."),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(shema) });

  useEffect(() => {
    if (Object.keys(customer).length) {
      console.log(customer);
    }
  }, [customer]);

  const submitHandler = ({ text }) => {
    const mutationData = {
      token,
      text,
      phoneNumber: customer.phoneNumber,
    };

    mutation.mutate(mutationData);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogHeader
          title={"ارسال پیام"}
          onClose={onClose}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box width={"100%"}>
            <h2 className="mb-4">
              ارسال پیام به {customer.firstName} {customer.lastName}
            </h2>
            <form action="" onSubmit={handleSubmit(submitHandler)}>
              <FormControl fullWidth className="mb-3" error={!!errors.text}>
                <InputLabel id="message-category">دسته بندی پیام</InputLabel>
                <Controller
                  name="text"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Select
                      fullWidth
                      labelId="message-category"
                      label="دسته بندی پیام"
                      {...field}
                    >
                      {data?.result.messages.map((message) => (
                        <MenuItem value={message.text} key={Math.random()}>
                          {message.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {!!errors.text && errors.text.message}
                </FormHelperText>
              </FormControl>
              <SubmitBtn isSubmitting={mutation.isPending}>
                ارسال پیام
              </SubmitBtn>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SendSms;
