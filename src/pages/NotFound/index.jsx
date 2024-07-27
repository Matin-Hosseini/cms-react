import ErrorLayout from "../../components/ErrorLayout";
import notFoundImg from "./../../assets/images/not-found.jpg";

const NotFound = () => {
  return <ErrorLayout img={notFoundImg} title={"صفحه مورد نظر یافت نشد."} />;
};

export default NotFound;
