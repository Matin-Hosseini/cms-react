import { Outlet, useLocation, useParams } from "react-router-dom";
import AddCup from "./Components/AddCup";
import AllCups from "./Components/AllCups";
import { useQuery } from "@tanstack/react-query";

const Cup = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/cup" ? (
        <>
          <div className=" mb-6">
            <AddCup />
          </div>
          <AllCups />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Cup;
