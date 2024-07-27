import { Button, IconButton, Skeleton } from "@mui/material";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
// import { usePathname } from "next/navigation";
import { PiUsers } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";
import { BiCommentAdd } from "react-icons/bi";
import { RiMailSendLine } from "react-icons/ri";
import { useUserContext } from "../contexts/user";
import SidebarLink from "./SideBarLink";

const menuItems = [];

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const { userPages } = useUserContext();

  return (
    <aside
      className={`side-bar ${isOpen ? "right-0" : "-right-[300px]"} lg:right-0`}
    >
      <div className="content p-4">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between lg:justify-center items-center mb-10">
              <Logo />
              <IconButton className="lg:hidden" onClick={() => onClose()}>
                <IoMdClose />
              </IconButton>
            </div>

            <ul>
              {userPages.length === 0
                ? Array.from(Array(6).keys()).map((item) => (
                    <Skeleton
                      key={item}
                      variant="rectangular"
                      sx={{ borderRadius: 1, mb: 1 }}
                      width={"100%"}
                      height={40}
                    />
                  ))
                : userPages.map((page) => (
                    <SidebarLink key={page.id} {...page} />
                  ))}
            </ul>
          </div>

          <div>
            <LogoutBtn />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
