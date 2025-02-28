import { Avatar, Menu } from "@mui/material";
import { useState } from "react";
import { PiGearSixLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        className=""
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ cursor: "pointer" }}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          onClick={() => setAnchorEl(null)}
          to={"/user-settings"}
          className="flex items-center justify-start gap-2 pl-16 pr-3 py-2 hover:bg-blue-100 text-blue-600 "
        >
          <PiGearSixLight />
          تنظیمات
        </Link>
      </Menu>
    </>
  );
}
