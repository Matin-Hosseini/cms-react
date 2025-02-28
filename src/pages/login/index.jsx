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
import Api from "../../axios/api";
import { useSnackbar } from "../../contexts/snackbar";
import SubmitBtn from "../../components/SubmitBtn";
import { incomingPath } from "../../utils/ProtectedRoute";
import createUserPages from "../../utils/createUserPages";
import pages from "../../../data/pages";

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

  const { getUserPermissions, setToken } = useAuthContext();

  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async ({ userName, password, remember_me }) => {
    try {
      const res = await Api.post("/Account/GetToken", {
        userName,
        password,
      });

      const token = res.data.result;
      Cookies.set("token", token, { expires: 1, path: "" });

      const userInfo = await getUserPermissions(token);

      const userPages = createUserPages(userInfo.result.permissions, pages);

      setToken(token);

      showSnackbar("خوش آمدید.");

      // navigate(incomingPath || userPages[0].route, { replace: true });
      navigate(incomingPath || "/sms", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showSnackbar("نام کاربری یا رمز عبور اشتباه می باشد.");
      } else {
        console.log(error);
        showSnackbar("خطا در برقراری ارتباط.");
      }
    }
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

        <SubmitBtn isSubmitting={isSubmitting}>ورود</SubmitBtn>
      </form>
    </div>
  );
};

export default Login;
