import AddNewCustomer from "../../components/AddNewCustomer";
import Table from "../../components/Table";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../services/requests/customers";

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

  return (
    <>
      <AddNewCustomer />
      <Table customers={data?.result.informationCustomer || []} />
    </>
  );
}
