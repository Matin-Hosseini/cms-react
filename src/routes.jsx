import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const AddSMSCategory = lazy(() => import("./pages/AddSMSCategory"));
const SendSms = lazy(() => import("./pages/sendSms"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/add-sms-category", element: <AddSMSCategory /> },
  { path: "/send-sms", element: <SendSms /> },
];

export default routes;
