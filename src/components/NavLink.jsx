import { Link } from "react-router-dom";

import { PiUsers } from "react-icons/pi";

const NavLink = ({ to, name }) => {
  // const pathName = usePathname();

  return (
    <Link
      href={{ to }}
      // className={`flex items-center gap-2 px-3 py-2 rounded-md mb-2 ${
      //   pathName === to && "bg-blue-800 text-white"
      // }`}
    >
      <PiUsers />
      {name}
    </Link>
  );
};

export default NavLink;
