import { useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/user";
import accessDeniedImg from "./../../assets/images/illustrations/no-access.webp";
import ErrorLayout from "../../components/ErrorLayout";

const DoesNotHaveAccess = ({ children }) => {
  const { pathname } = useLocation();

  const { userPages } = useUserContext();

  const hasAccess = userPages.some((page) => page.route === pathname);

  return hasAccess ? (
    children
  ) : (
    <ErrorLayout
      img={accessDeniedImg}
      title={"شما به این صفحه دسترسی ندارید."}
    />
  );
};

export default DoesNotHaveAccess;
