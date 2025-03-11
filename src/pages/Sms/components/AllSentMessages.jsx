import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../axios/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import gregorianToJalaali from "./../../../utils/funcs/gregorianToJalaali";
import { useSnackbar } from "../../../contexts/snackbar";
import { useQuery } from "@tanstack/react-query";
import { sentMessages } from "../../../services/requests/sms";
import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AllSentMessagesTable from "./AllSentMessagesTable";
import { useAuthContext } from "../../../contexts/auth";

const AllSentMessages = () => {
  const { token } = useAuthContext();

  const { data, isLoading, isError, isPending, error, isSuccess } = useQuery({
    queryKey: ["sent-messages"],
    queryFn: () => sentMessages(token),
  });

  const messages = data?.result.postedSmsLogs.map((row) => ({
    ...row,
    timeSent: gregorianToJalaali(row.whenSent),
  }));

  return (
    <>
      {isPending && <TableSkeleton />}
      {isSuccess && <AllSentMessagesTable allMessages={messages} />}
    </>
  );
};

export default AllSentMessages;
