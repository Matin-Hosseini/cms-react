import {
  Avatar,
  Badge,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { CiMenuFries } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import ProfilePic from "./../assets/images/profile.webp";
import { FaRegBell } from "react-icons/fa6";
import { useState } from "react";
import { useAuthContext } from "../contexts/auth";

const Header = ({ onSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { userInfo, isLoggedIn } = useAuthContext();

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="header z-50">
      <div className="content flex items-center w-full">
        <IconButton className="ml-4 lg:hidden " onClick={onSidebar}>
          <CiMenuFries />
        </IconButton>
        <div className="flex items-center justify-between w-full">
          <FormControl
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="hidden sm:block">{userInfo.userName}</h2>
              <Avatar src={ProfilePic} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
