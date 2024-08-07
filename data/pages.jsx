import { PiUsersThreeLight } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { TbMessage2 } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { MdOutlineSwitchAccessShortcut } from "react-icons/md";
import { AiOutlineCluster } from "react-icons/ai";

const pages = [
  {
    id: 1,
    route: "/customers",
    title: "مشتریان",
    icon: <PiUsersThreeLight />,
    permissionIDs: [9, 10, 15, 25],
  },
  {
    id: 2,
    route: "/cup",
    title: "کاپ",
    icon: <GiTrophyCup />,
    permissionIDs: [12, 13, 14],
  },
  {
    id: 3,
    route: "/sms",
    title: "پیامک ها",
    icon: <TbMessage2 />,
    permissionIDs: [22, 23, 24, 27, 28, 29, 30],
  },
  {
    id: 4,
    route: "/users",
    title: "کاربران",
    icon: <FiUsers />,
    permissionIDs: [16, 18, 19, 26],
  },
  // {
  //   id: 5,
  //   route: "/permissions",
  //   title: "دسترسی ها",
  //   icon: <MdOutlineSwitchAccessShortcut />,
  //   permissionIDs: [1, 2, 3, 16, 17],
  // },
  // {
  //   id: 6,
  //   route: "/roles",
  //   title: "نقش ها",
  //   icon: <AiOutlineCluster />,
  //   permissionIDs: [4, 5, 6, 17],
  // },
];

export default pages;
