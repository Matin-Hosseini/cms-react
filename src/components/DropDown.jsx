import { useState } from "react";
import { Button, FormControl, Menu, Select } from "@mui/material";

import { TbChevronDown } from "react-icons/tb";

export default function DropDown({ label, children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        id="dropdown-menu-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <span>{label}</span>
        <TbChevronDown />
      </Button>

      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={open}
        MenuListProps={{
          "aria-labelledby": "dropdown-menu-button",
        }}
      >
        <div className="p-4">{children}</div>
      </Menu>
    </>
  );
}
