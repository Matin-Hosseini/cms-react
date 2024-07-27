import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));

const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"));
const IsProgressing = lazy(() => import("./pages/IsProgressing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sms = lazy(() => import("./pages/Sms"));
const Users = lazy(() => import("./pages/Users"));
const WithAuth = lazy(() => import("./HOCs/withPermission"));
const DoesNotHaveAccess = lazy(() => import("./pages/DoesNotHaveAccess"));

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/customers",
        element: (
          <DoesNotHaveAccess>
            <Home />
          </DoesNotHaveAccess>
        ),
      },
      {
        path: "/cup",
        element: (
          <DoesNotHaveAccess>
            <IsProgressing />
          </DoesNotHaveAccess>
        ),
      },
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
        path: "/permissions",
        element: (
          <DoesNotHaveAccess>
            <IsProgressing />
          </DoesNotHaveAccess>
        ),
      },
      {
        path: "/permissions",
        element: (
          <DoesNotHaveAccess>
            <IsProgressing />
          </DoesNotHaveAccess>
        ),
      },
      {
        path: "/roles",
        element: (
          <DoesNotHaveAccess>
            <IsProgressing />
          </DoesNotHaveAccess>
        ),
      },
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
