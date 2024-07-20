import { Link, redirect } from "react-router-dom";
import AddNewCustomer from "../../components/AddNewCustomer";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuthContext } from "../../contexts/auth";

export default function Home() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.post(
          "https://iroriginaltest.com/api/Customer/GetAllCustomers",
          {
            typeOfRegisterCustomer_Id: null,
            registerDate: null,
            phoneNumber: null,
            nationalCode: null,
            token: Cookies.get("token"),
          }
        );

        setCustomers(res.data.result.informationCustomer);
      } catch (error) {
        console.log(error);
      }
    };

    getCustomers();
  }, []);

  return (
    <>
      <AddNewCustomer />
      <Table customers={customers} />
    </>
  );
}
