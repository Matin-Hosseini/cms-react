import DataTable from "../../components/DataTable";
import { columns } from "../../../data/tables/users";
import Cookies from "js-cookie";
import AddUser from "./components/AddUser";
import UserInformation from "./components/UserInformation";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/requests/users";
import WithPermission from "../../HOCs/withPermission";

const Users = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await getAllUsers({
        token: Cookies.get("token"),
        userName: "",
      }),
  });

  if (data) {
    console.log(data);
  }

  const AddUserWithPermission = WithPermission(AddUser, 19);
  const UserInformationWithPermission = WithPermission(UserInformation, 18);
  const UsersWithPermission = WithPermission(DataTable, 26);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <AddUserWithPermission />
        <UserInformationWithPermission />
      </div>

      <UsersWithPermission
        columns={columns}
        rows={data?.result.users || []}
        custom_ID={"userID"}
      />
    </div>
  );
};

export default Users;
