import { zodResolver } from "@hookform/resolvers/zod";
import chess from "./../../assets/images/login/chess.jpg";
import chess2 from "./../../assets/images/login/chess-vertical.jpg";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import { useState } from "react";
import Logo from "./../../components/Logo";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import { loginSchema } from "../../validations/schemas/user";
import { useSnackbar } from "../../contexts/snackbar";
import SubmitBtn from "../../components/SubmitBtn";
import { incomingPath } from "../../utils/ProtectedRoute";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/requests/auth";

const loginFormControlStyles = {
  width: "100%",
  mb: 2,
  "& label, & label.Mui-focused": { color: "#fff" },
  "& fieldset, ": { borderColor: "#fff !important" },
  "& input": { color: "#fff" },
  "& svg": { color: "#fff" },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useAuthContext();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => await login(data),
    onSuccess: (data) => {
      Cookies.set("token", data.data.result, { expires: 1, path: "" });
      authContext.setToken(data.data.result);
      authContext.setIsLoggedIn(true);
      navigate(incomingPath || "/sms", { replace: true });
      showSnackbar(
        "ورود با موفقیت انجام شد. در حال انتقال به صفحه مورد نظر..."
      );

      queryClient.resetQueries({ queryKey: ["user-info"] });
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        showSnackbar("نام کاربری یا رمز عبور اشتباه می باشد.", "error");
      } else {
        showSnackbar(
          error.response.data.result || error.response.data.message || "خطا"
        );
      }
    },
  });

  const handleLogin = async ({ userName, password, remember_me }) => {
    loginMutation.mutate({ userName, password });
  };

  return (
    <div className="bg-black relative">
      <div className="w-vw h-dvh md:hidden">
        <img
          src={chess2}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div className="w-vw h-dvh hidden md:block">
        <img
          src={chess}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <form
        className="absolute top-1/2 right-1/2 px-5 w-3/4 md:w-auto py-5 rounded-lg  bg-[rgba(255,255,255,0.2)] backdrop-blur-[2px] translate-x-1/2 -translate-y-1/2 text-white"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex justify-center mb-5">
          <Logo />
        </div>
        <FormControl sx={loginFormControlStyles} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            نام کاربری
          </InputLabel>
          <OutlinedInput
            {...register("userName")}
            id="userName"
            type="text"
            label="username"
          />
          {errors.userName && (
            <span className="text-red-400">{errors.userName.message}</span>
          )}
        </FormControl>
        <FormControl sx={loginFormControlStyles} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            رمز عبور
          </InputLabel>
          <OutlinedInput
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoEye />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
        </FormControl>

        <FormGroup sx={{ mb: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register("remember_me")}
                sx={{
                  "&, &.Mui-checked": { color: "#fff" },
                }}
              />
            }
            label="مرا به خاطر بسپار"
          />
        </FormGroup>

        <SubmitBtn isSubmitting={loginMutation.isPending}>ورود</SubmitBtn>
      </form>
    </div>
  );
};

export default Login;
