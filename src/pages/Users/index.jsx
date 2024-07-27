import DataTable from "../../components/DataTable";
import { columns } from "../../../data/tables/users";
import { useEffect, useState } from "react";
import Api from "../../axios/api";
import Cookies from "js-cookie";
import AddUser from "./components/AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const getUsers = async () => {
      try {
        const res = await Api.post("/User/GetAllUsers", {
          token,
          userName: "",
        });

        console.log(res.data);

        setUsers(res.data.result.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <AddUser />
      </div>

      <DataTable columns={columns} rows={users} custom_ID={"userID"} />
    </div>
  );
};

export default Users;
