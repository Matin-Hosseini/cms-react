import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const AddSMSCategory = lazy(() => import("./pages/AddSMSCategory"));
const SendSms = lazy(() => import("./pages/sendSms"));
const AllSentSMSs = lazy(() => import("./pages/AllSentSMSs"));
import ProtectedRoute from "./utils/ProtectedRoute";

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-sms-category", element: <AddSMSCategory /> },
      { path: "/send-sms", element: <SendSms /> },
      { path: "/all-sent-messages", element: <AllSentSMSs /> },
    ],
  },
];

export default routes;
