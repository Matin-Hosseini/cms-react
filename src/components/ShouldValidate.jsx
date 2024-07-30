import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { z } from "zod";

// Define your base schema
const baseSchema = z.object({
  shouldValidate: z.boolean(),
});

const ShouldValidate = () => {
  const [shouldValidate, setShouldValidate] = useState(false);

  // Extend the schema conditionally
  const schema = shouldValidate
    ? baseSchema.extend({
        mySelect: z.string().nonempty("This field is required"),
      })
    : baseSchema.extend({
        mySelect: z.string().optional(),
      });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      shouldValidate: false,
      mySelect: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <FormControlLabel
          control={
            <Controller
              name="shouldValidate"
              control={control}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    setShouldValidate(e.target.checked);
                  }}
                />
              )}
            />
          }
          label="Should Validate"
        />
      </FormControl>

      <FormControl fullWidth error={!!errors.mySelect}>
        <InputLabel id="my-select-label">My Select</InputLabel>
        <Controller
          name="mySelect"
          control={control}
          render={({ field }) => (
            <Select labelId="my-select-label" label="My Select" {...field}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          )}
        />
        <FormHelperText>
          {errors.mySelect ? errors.mySelect.message : ""}
        </FormHelperText>
      </FormControl>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ShouldValidate;
