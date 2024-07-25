import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ icon, route, title }) => {
  const { pathname } = useLocation();

  return (
    <li>
      <Link
        to={route}
        className={`flex items-center gap-2 rounded-md mb-2 py-2 px-4 ${
          pathname === route && "bg-blue-800 text-white"
        }`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default SidebarLink;
