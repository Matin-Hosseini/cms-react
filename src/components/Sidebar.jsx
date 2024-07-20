import { Button, IconButton } from "@mui/material";
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

const menuItems = [];

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

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
              <li>
                <Link
                  to={"/"}
                  className={`flex items-center gap-2 rounded-md mb-2 py-2 px-4 ${
                    pathname === "/" && "bg-blue-800 text-white"
                  }`}
                >
                  <PiUsers />
                  کاربران
                </Link>
              </li>
              <li>
                <Link
                  to={"/add-sms-category"}
                  className={`flex items-center gap-2 rounded-md mb-2 py-2 px-4 ${
                    pathname === "/add-sms-category" && "bg-blue-800 text-white"
                  }`}
                >
                  <BiCommentAdd />
                  افزودن دسته بندی پیامک
                </Link>
              </li>
              <li>
                <Link
                  to={"/send-sms"}
                  className={`flex items-center gap-2 rounded-md mb-2 py-2 px-4 ${
                    pathname === "/send-sms" && "bg-blue-800 text-white"
                  }`}
                >
                  <RiMailSendLine />
                  ارسال پیامک
                </Link>
              </li>
              {/* <li>
                <NavLink />
              </li> */}
              {/* <li className="py-2 px-4">
                <Link
                  to={"/user"}
                  // className={pathName === "/user" ? "bg-red-400" : ""}
                >
                  آیتم 1
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link to={""}>آیتم 2</Link>
              </li>
              <li className="py-2 px-4">
                <Link to={""}>آیتم 3</Link>
              </li>
              <li className="py-2 px-4">
                <Link to={""}>آیتم 4</Link>
              </li> */}
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
