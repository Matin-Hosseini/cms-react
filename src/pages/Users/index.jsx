import DataTable from "../../components/DataTable";
import { columns } from "../../../data/tables/users";
import { useEffect, useState } from "react";
import Api from "../../axios/api";
import Cookies from "js-cookie";
import AddUser from "./components/AddUser";
import UserInformation from "./components/UserInformation";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/requests/users";

const Users = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await getAllUsers({
        token: Cookies.get("token"),
        userName: "",
      }),
  });

  console.log(data);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <AddUser />
        <UserInformation />
      </div>

      <DataTable
        columns={columns}
        rows={data?.result.users || []}
        custom_ID={"userID"}
      />
    </div>
  );
};

export default Users;
