// import { PiUsersThreeLight } from "react-icons/pi";
// import { GiTrophyCup } from "react-icons/gi";
// import { TbMessage2 } from "react-icons/tb";
// import { FiUsers } from "react-icons/fi";
// import { MdOutlineSwitchAccessShortcut } from "react-icons/md";
// import { AiOutlineCluster } from "react-icons/ai";
// import removeDuplicateObjectsFromArray from "./src/utils/funcs/removeDuplicatedObjectsFromArray";

// const permissions = [
//   {
//     permission_Id: 1,
//     permission_Name: "AddPermission",
//   },
//   {
//     permission_Id: 2,
//     permission_Name: "RemovePermission",
//   },
//   {
//     permission_Id: 3,
//     permission_Name: "GetAllPermission",
//   },
//   {
//     permission_Id: 4,
//     permission_Name: "GetAllRoles",
//   },
//   {
//     permission_Id: 5,
//     permission_Name: "RemoveRole",
//   },
//   {
//     permission_Id: 6,
//     permission_Name: "AddRole",
//   },
//   {
//     permission_Id: 9,
//     permission_Name: "AddNewCustomer",
//   },
//   {
//     permission_Id: 10,
//     permission_Name: "GetAllCustomers",
//   },
//   {
//     permission_Id: 12,
//     permission_Name: "AddNewTitleCap",
//   },
//   {
//     permission_Id: 13,
//     permission_Name: "GetAllTitleCap",
//   },
//   {
//     permission_Id: 14,
//     permission_Name: "RemoveTitleCap",
//   },
//   {
//     permission_Id: 15,
//     permission_Name: "AddCustomers",
//   },
//   {
//     permission_Id: 16,
//     permission_Name: "GetUsersPermissions",
//   },
//   {
//     permission_Id: 17,
//     permission_Name: "AddPermissionToRole",
//   },
//   {
//     permission_Id: 18,
//     permission_Name: "GetUserInformation",
//   },
//   {
//     permission_Id: 19,
//     permission_Name: "AddUser",
//   },
//   {
//     permission_Id: 20,
//     permission_Name: "GetPermissionsUserByUser",
//   },
//   {
//     permission_Id: 21,
//     permission_Name: "ClearRegisterCustomerGaming",
//   },
//   {
//     permission_Id: 22,
//     permission_Name: "SendSmsToAnyOne",
//   },
//   {
//     permission_Id: 23,
//     permission_Name: "AddNewTextMessage",
//   },
//   {
//     permission_Id: 24,
//     permission_Name: "GetAllTextMessage",
//   },
//   {
//     permission_Id: 25,
//     permission_Name: "RemoveCustomer",
//   },
//   {
//     permission_Id: 26,
//     permission_Name: "GetAllUsers",
//   },
//   {
//     permission_Id: 27,
//     permission_Name: "SendListSmsToAnyOne",
//   },
//   {
//     permission_Id: 28,
//     permission_Name: "RemoveAllPostedSmsLog",
//   },
//   {
//     permission_Id: 29,
//     permission_Name: "ShowAllPostedSmsLog",
//   },
//   {
//     permission_Id: 30,
//     permission_Name: "RemoveTextMessage",
//   },
// ];

// const pagesBasedOnPermission = [
//   {
//     id: 1,
//     route: "/customers",
//     title: "مشتریان",
//     icon: <PiUsersThreeLight />,
//     permissionIDs: [9, 10, 15, 25],
//   },
//   {
//     id: 2,
//     route: "/cup",
//     title: "کاپ",
//     icon: <GiTrophyCup />,
//     permissionIDs: [12, 13, 14],
//   },
//   {
//     id: 3,
//     route: "/sms",
//     title: "پیامک ها",
//     icon: <TbMessage2 />,
//     permissionIDs: [22, 23, 24, 27, 28, 29, 30],
//   },
//   {
//     id: 4,
//     route: "/users",
//     title: "کاربران",
//     icon: <FiUsers />,
//     permissionIDs: [16, 18, 19, 26],
//   },
//   {
//     id: 5,
//     route: "/permissions",
//     title: "دسترسی ها",
//     icon: <MdOutlineSwitchAccessShortcut />,
//     permissionIDs: [1, 2, 3, 16, 17],
//   },
//   {
//     id: 6,
//     route: "/roles",
//     title: "نقش ها",
//     icon: <AiOutlineCluster />,
//     permissionIDs: [4, 5, 6, 17],
//   },
// ];

// const matinPermissions = [
//   {
//     permission_Id: 10,
//     permission_Name: "GetAllCustomers",
//   },
//   {
//     permission_Id: 20,
//     permission_Name: "GetPermissionsUserByUser",
//   },
//   {
//     permission_Id: 22,
//     permission_Name: "SendSmsToAnyOne",
//   },
//   {
//     permission_Id: 13,
//     permission_Name: "GetAllTitleCap",
//   },
//   {
//     permission_Id: 14,
//     permission_Name: "RemoveTitleCap",
//   },
//   {
//     permission_Id: 15,
//     permission_Name: "AddCustomers",
//   },
//   {
//     permission_Id: 15,
//     permission_Name: "AddCustomers",
//   },
// ];

// const matinPermissionIDs = matinPermissions.map(
//   (permission) => permission.permission_Id
// );

// const userPages = [];

// matinPermissionIDs.forEach((permission) => {
//   pagesBasedOnPermission.forEach((page) => {
//     const pagePermissions = page.permissionIDs;
//     if (pagePermissions.includes(permission)) {
//       userPages.push(page);
//     }
//   });
// });

// const pagesWithoutDuplicate = removeDuplicateObjectsFromArray(userPages);

// export { permissions, pagesBasedOnPermission };

const roles = [
  {
    id: 1,
    name: "SystemAdmin",
    description: "Can See All Actions",
  },
  {
    id: 2,
    name: "Proggrammer",
    description: "access to actions for developing",
  },
  {
    id: 3,
    name: "generalManager",
    description: "مدیر عامل آقای هنرمند",
  },
  {
    id: 4,
    name: "AdminFC24",
    description: "admin fc24",
  },
];
