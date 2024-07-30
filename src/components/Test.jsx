import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
} from "@mui/material";
import { z } from "zod";

const schema = z.object({
  mySelect: z.string().min(1, "this is required"),
});

function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth error={!!errors.mySelect}>
        <InputLabel id="my-select-label">دسته بندی پیام</InputLabel>
        <Controller
          name="mySelect"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select labelId="my-select-label" label="دسته بندی پیام" {...field}>
              <MenuItem value="">
                <em>دسته بندی پیام</em>
              </MenuItem>
              <MenuItem value="option1">تست 1</MenuItem>
              <MenuItem value="option2">تست 2</MenuItem>
              <MenuItem value="option3">تست 3</MenuItem>
            </Select>
          )}
        />
        <FormHelperText>
          {errors.mySelect ? errors.mySelect.message : ""}
        </FormHelperText>
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default MyForm;
