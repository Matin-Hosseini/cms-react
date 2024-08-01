import AddNewCustomer from "../../components/AddNewCustomer";
import Table from "../../components/Table";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../services/requests/customers";
import Test from "../../components/Test";
import { useForm } from "react-hook-form";
import ShouldValidate from "../../components/ShouldValidate";
import Date from "../../components/Date";

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

  // const {Controller, } = useForm()

  return (
    <>
      <AddNewCustomer />
      <Table customers={data?.result.informationCustomer || []} />
      <Date />
      {/* <Test />
      <ShouldValidate /> */}
    </>
  );
}
