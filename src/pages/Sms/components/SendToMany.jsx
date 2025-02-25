import {
  Alert,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import SubmitBtn from "../../../components/SubmitBtn";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useSnackbar } from "../../../contexts/snackbar";
import { CiViewList } from "react-icons/ci";
import { TbFileSad } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSmsCategories,
  sendListSmsToAnyOne,
} from "../../../services/requests/sms";
import { sendListSmsToAnyOneSchema } from "../../../validations/schemas/panelSms";
import { useAuthContext } from "../../../contexts/auth";
import { number } from "prop-types";

export default function SendToMany({ disabled }) {
  const [maxNumbers, setMaxNumbers] = useState(50);
  const [numbers, setNumbers] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [selectBoxValue, setSelectBoxValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showUrl, setShowUrl] = useState(true);
  const [typeOfRequest, setTypeOfRequest] = useState("0");

  const { showSnackbar } = useSnackbar();

  const { token } = useAuthContext();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(sendListSmsToAnyOneSchema) });

  const { data: categoriesResult, isFetching } = useQuery({
    queryKey: ["sms-categories"],
    queryFn: async () => await getSmsCategories(token),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await sendListSmsToAnyOne(data),
    onSuccess: async () => {
      showSnackbar("پیام ارسال شد.");
      queryClient.invalidateQueries(["sent-messages"]);

      setNumbers([]);
    },
    onError: (error) => {
      showSnackbar(error.response.data.title, "error");
    },
  });

  const submitHandler = async (data) => {
    setIsSubmitted(true);

    if (!selectedValue) return;

    if (!numbers.length) {
      showSnackbar("لطفا ابتدا شماره های مدنظر را وارد کنید.", "error");
      return;
    }
    const phoneNumbers = [];
    numbers.forEach((item) => phoneNumbers.push(item?.phoneNumber));

    const messageText = categoriesResult.result.messages.find(
      (message) => selectBoxValue === message.message_ID
    ).text;

    const mutationData = {
      token,
      phoneNumbers,
      showUrl,
      typeOfRequest: +typeOfRequest,
      text: messageText,
    };

    mutation.mutate(mutationData);
  };

  const handleDelete = (id) => {
    setNumbers((prev) => prev.filter((number) => number.id !== id));
  };

  const addNumber = async (value) => {
    if (!value.includes("/")) return;
    console.log("is running");

    const isValid = await trigger("phoneNumber");
    if (!isValid) return;

    const phoneNumber = value.split("/")[0];
    const newNumber = { id: crypto.randomUUID(), phoneNumber };

    setNumbers((prev) => [...prev, newNumber]);
    setValue("phoneNumber", "");
  };

  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      const phoneNumber = getValues("phoneNumber");

      const isValid = await trigger("phoneNumber");

      if (!isValid) return;

      const newNumber = { id: crypto.randomUUID(), phoneNumber };

      if (numbers.length === maxNumbers) {
        showSnackbar(
          `تعداد شماره های ارسالی نمی تواند بیشتر از ${maxNumbers} تا باشد.`,
          "error"
        );

        return;
      }

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
        <Alert severity="warning">
          دقت داشته باشید که تنها شماره هایی که در لیست شماره های درج شده قرار
          داشته باشند ارسال خواهد شد.
        </Alert>
        <Alert severity="error">
          شما حداکثر {maxNumbers} پیام به صروت همزمان می توانید ارسال کنید.
        </Alert>
      </div>
      <form
        action="#"
        className=" mt-5 mb-10"
        onSubmit={handleSubmit(submitHandler)}
      >
        <FormControl
          fullWidth
          className="mb-3"
          error={isSubmitted && !selectedValue}
        >
          <InputLabel id="message-category">دسته بندی</InputLabel>
          <Select
            labelId="message-category"
            id="messega-cateogyr-select"
            value={selectBoxValue}
            label="دسته بندی"
            onChange={(e) => setSelectBoxValue(e.target.value)}
          >
            {categoriesResult?.result?.messages.map((message) => (
              <MenuItem
                value={message.message_ID}
                onClick={() => setSelectedValue(message.message_ID)}
                key={message.message_ID}
              >
                {message.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {isSubmitted && !selectedValue && (
          <span className="text-red-600 block mb-2 text-xs">
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
            // onChange: (e) => {
            //   addNumber(e.target.value);
            // },
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <RadioGroup
          defaultValue={typeOfRequest}
          onChange={(e) => setTypeOfRequest(e.target.value)}
          className="flex flex-row items-center gap-3 justify-items-start"
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="ارسال کارشناس مربوطه"
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="ارسال واحد مربوطه"
          />
        </RadioGroup>

        {/* <Controller
          name="showUrl"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} defaultChecked />}
              label="ارسال لینک سایت"
            />
          )}
        /> */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showUrl}
              onChange={() => setShowUrl((prev) => !prev)}
            />
          }
          label="ارسال لینک سایت"
        />
        <SubmitBtn
          onClick={submitHandler}
          className="bg-purple-600"
          isSubmitting={mutation.isPending}
          disabled={disabled}
          type="button"
        >
          ارسال
        </SubmitBtn>
      </form>

      <div>
        <div className="flex items-center gap-2 text-blue-600">
          <CiViewList className="text-2xl" />
          <h2>شماره های درج شده: {numbers.length}</h2>
        </div>

        <ul className="flex justify-center gap-3 flex-wrap my-10">
          {!numbers.length ? (
            <div className="flex items-center justify-center gap-2 text-red-600 border border-dashed border-red-600 max-w-[290px] w-full py-8">
              <TbFileSad className="text-2xl" />
              <h3>هنوز شماره ای درج نکرده اید</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {numbers.map((number) => (
                <li key={number.id}>
                  <Chip
                    label={number.phoneNumber}
                    color="success"
                    onDelete={() => handleDelete(number.id)}
                  />
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
