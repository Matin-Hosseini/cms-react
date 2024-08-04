import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../../services/requests/role";
import Cookies from "js-cookie";

const Role = () => {
  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await getAllRoles(Cookies.get("token")),
  });

  console.log(data);

  return (
    <div>
      <h2>صفحه نقش ها</h2>
    </div>
  );
};

export default Role;
