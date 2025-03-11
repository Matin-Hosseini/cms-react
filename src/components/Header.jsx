import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
} from "@mui/material";
import { CiMenuFries } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { useUserContext } from "../contexts/user";
import UserProfile from "./UserProfile";

const Header = ({ onSidebar }) => {
  const { userInfo, isGettingUserInfo } = useUserContext();

  return (
    <header className="header z-50">
      <div className="content flex items-center w-full">
        <IconButton className="ml-4 lg:hidden " onClick={onSidebar}>
          <CiMenuFries />
        </IconButton>
        <div className="flex  items-center justify-between w-full">
          <FormControl
            className="hidden"
            sx={{
              m: 1,
              "& .MuiInputBase-root": { paddingLeft: "16px" },
              "& .MuiInputBase-input": { padding: "12.5px 14px" },
            }}
            variant="outlined"
          >
            <InputLabel
              sx={{
                top: "50%",
                transform: "translate(14px, -50%)",
                "&.Mui-focused": {
                  transform: "translate(14px, -180%)",
                  fontSize: ".8rem",
                },
                transition: ".2s",
              }}
              htmlFor="search-input"
            >
              جستجو
            </InputLabel>
            <OutlinedInput
              id="search-input"
              type="text"
              sx={{
                borderRadius: "10rem",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <IoIosSearch />
                  </IconButton>
                </InputAdornment>
              }
              label="جستجو"
            />
          </FormControl>

          <p className="text-sm">
            <span className="text-lg">
              {isGettingUserInfo ? (
                <Skeleton variant="rectangular" width={210} height={30} />
              ) : (
                userInfo.userName
              )}
            </span>{" "}
            عزیز، به سامانه پیامکی ایران اورجینال خوش اومدی!
          </p>

          <div className="hidden lg:block">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
