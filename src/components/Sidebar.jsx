import { IconButton, Skeleton } from "@mui/material";
import Logo from "./Logo";
import { IoMdClose } from "react-icons/io";
import LogoutBtn from "./LogoutBtn";
import { useUserContext } from "../contexts/user";
import SidebarLink from "./SideBarLink";
import UserProfile from "./UserProfile";

const Sidebar = ({ isOpen, onClose }) => {
  const { userPages, isGettingUserInfo } = useUserContext();

  return (
    <aside
      className={`side-bar ${isOpen ? "right-0" : "-right-[300px]"} lg:right-0`}
    >
      <div className="content p-4">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between lg:justify-center items-center mb-10">
              <div className="hidden lg:block">
                <Logo />
              </div>
              <div className="lg:hidden">
                <UserProfile />
              </div>
              <IconButton className="lg:hidden" onClick={() => onClose()}>
                <IoMdClose />
              </IconButton>
            </div>

            <ul>
              {userPages.length && isGettingUserInfo === 0
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
