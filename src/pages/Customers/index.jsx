import AddNewCustomer from "../../components/AddNewCustomer";
import Table from "../../components/Table";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../services/requests/customers";
import gregorianToJalaali from "../../utils/funcs/gregorianToJalaali";
import WithHasPermission from "../../HOCs/WithHasPermission";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["customers"],
    queryFn: async () =>
      await getAllCustomers({
        typeOfRegisterCustomer_Id: null,
        registerDate: null,
        phoneNumber: null,
        nationalCode: null,
        token: Cookies.get("token"),
      }),
  });

  const customers = data?.result.informationCustomer.map((customer) => ({
    ...customer,
    registerDate: gregorianToJalaali(customer.registerDate),
  }));

  return (
    <>
      <WithHasPermission permissionName={"AddNewCustomer"}>
        <AddNewCustomer />
      </WithHasPermission>

      <WithHasPermission permissionName={"GetAllCustomers"}>
        <Table customers={customers || []} />
      </WithHasPermission>
    </>
  );
}
