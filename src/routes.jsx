import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Customers = lazy(() => import("./pages/Customers"));
const Login = lazy(() => import("./pages/login"));

const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"));
const IsProgressing = lazy(() => import("./pages/IsProgressing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sms = lazy(() => import("./pages/Sms"));
const Users = lazy(() => import("./pages/Users"));
const WithAuth = lazy(() => import("./HOCs/withPermission"));
const DoesNotHaveAccess = lazy(() => import("./pages/DoesNotHaveAccess"));
const Role = lazy(() => import("./pages/Role"));
const Cup = lazy(() => import("./pages/Cup"));
const Tables = lazy(() => import("./pages/Tables"));
const CupDetails = lazy(() => import("./pages/Cup/Components/CupDetails"));
const CallCenter = lazy(() => import("./pages/CallCenter"));
const Calculator = lazy(() => import("./pages/Calculator"));
const UserSettings = lazy(() => import("./pages/UserSettings"));

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      // {
      //   path: "/customers",
      //   element: (
      //     <DoesNotHaveAccess>
      //       <Customers />
      //     </DoesNotHaveAccess>
      //   ),
      // },
      // {
      //   path: "/cup",
      //   element: (
      //     <DoesNotHaveAccess>
      //       <Cup />
      //     </DoesNotHaveAccess>
      //   ),
      //   children: [{ path: ":cupId", element: <CupDetails /> }],
      // },
      {
        path: "/sms",
        element: (
          <DoesNotHaveAccess>
            <Sms />
          </DoesNotHaveAccess>
        ),
      },
      {
        path: "/users",
        element: (
          <DoesNotHaveAccess>
            <Users />
          </DoesNotHaveAccess>
        ),
      },
      {
        path: "/user-settings",
        element: (
          // <DoesNotHaveAccess>
          <UserSettings />
          // </DoesNotHaveAccess>
        ),
      },
      // {
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   path: "/permissions",
      //   element: (
      //     <DoesNotHaveAccess>
      //       <IsProgressing />
      //     </DoesNotHaveAccess>
      //   ),
      // },
      // {
      //   path: "/permissions",
      //   element: (
      //     <DoesNotHaveAccess>
      //       <IsProgressing />
      //     </DoesNotHaveAccess>
      //   ),
      // },
      // {
      //   path: "/roles",
      //   element: (
      //     <DoesNotHaveAccess>
      //       <IsProgressing />
      //     </DoesNotHaveAccess>
      //   ),
      // },
      // {
      //   path: "/call-center",
      //   element: <CallCenter />,
      // },
      {
        path: "/calculator",
        element: <Calculator />,
      },
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
