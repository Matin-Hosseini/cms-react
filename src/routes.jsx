import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Customers = lazy(() => import("./pages/Customers"));
const Login = lazy(() => import("./pages/login"));

const IsProgressing = lazy(() => import("./pages/IsProgressing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sms = lazy(() => import("./pages/Sms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const WithAuth = lazy(() => import("./HOCs/withPermission"));
const DoesNotHaveAccess = lazy(() => import("./pages/DoesNotHaveAccess"));
const Role = lazy(() => import("./pages/Role"));
const Cup = lazy(() => import("./pages/Cup"));
const Tables = lazy(() => import("./pages/Tables"));
const CupDetails = lazy(() => import("./pages/Cup/Components/CupDetails"));
const CallCenter = lazy(() => import("./pages/CallCenter"));
const Calculator = lazy(() => import("./pages/Calculator"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const RootLayout = lazy(() => import("./layouts/root"));

import PrivateRoute from "./contexts/PrivateRoute";

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "sms",
        element: (
          <PrivateRoute
            routePermissions={[
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
            ]}
          >
            <Sms />
          </PrivateRoute>
        ),
      },
      {
        path: "accessibility",
        element: (
          <PrivateRoute
            routePermissions={[
              "GetAllUsers",
              "GetRole",
              "EditRole",
              "GetPermissionsRole",
            ]}
          >
            <Accessibility />
          </PrivateRoute>
        ),
      },
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
