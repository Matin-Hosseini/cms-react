import logo from "./../assets/images/logo/logo-iranoriginal-gray.webp";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"https://iroriginal.com/"}>
      <img src={logo} alt="ایران اورجینال" width={"110px"} />
    </Link>
  );
};

export default Logo;
