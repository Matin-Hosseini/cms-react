import { PiUsersThreeLight } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { TbMessage2 } from "react-icons/tb";
import { PiOfficeChairFill } from "react-icons/pi";
import { IoAccessibilitySharp } from "react-icons/io5";

const pages = [
  {
    id: 1,
    route: "/customers",
    title: "مشتریان",
    icon: <PiUsersThreeLight />,
    permissions: [],
  },
  {
    id: 2,
    route: "/cup",
    title: "کاپ",
    icon: <GiTrophyCup />,
    permissions: [],
  },
  {
    id: 3,
    route: "/sms",
    title: "پیامک ها",
    icon: <TbMessage2 />,
    permissions: [
      "SendSmsToAnyOne",
      "AddNewTextMessage",
      "GetAllTextMessage",
      "RemoveCustomer",
      "SendListSmsToAnyOne",
      "RemoveAllPostedSmsLog",
      "ShowAllPostedSmsLog",
      "RemoveTextMessage",
      "SendSmsForCallCenter",
      "SendSmsWithCategory",
      "Can See All Log SMS",
      "EditTextMessage",
    ],
  },
  {
    id: 4,
    route: "/accessibility",
    title: "سطح دسترسی",
    icon: <IoAccessibilitySharp />,
    permissions: ["GetAllUsers", "GetRole", "EditRole", "GetPermissionsRole"],
  },
  {
    id: 5,
    route: "/tables",
    title: "مدیریت صندلی ها",
    icon: <PiOfficeChairFill />,
    permissions: [],
  },
];

export default pages;
