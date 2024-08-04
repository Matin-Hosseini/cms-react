import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ icon, route, title }) => {
  const { pathname } = useLocation();

  return (
    <li>
      <Link
        to={route}
        className={`flex items-center gap-2 rounded-md mb-2 py-2 px-4 hover:bg-violet-200 hover:text-violet-800 transition ${
          pathname === route && "bg-violet-200 text-violet-800"
        }`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default SidebarLink;
