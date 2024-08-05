import { useMutation } from "@tanstack/react-query";
import { getCustomerGameDetails } from "../../../services/requests/customers";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gregorianDateToJalali } from "../../../utils/funcs/gregorianToJalaali";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import SetPresenceDate from "./SetPresenceDate";

const CustomerDetails = ({ open, customer, onClose }) => {
  const [dateDialog, setDateDialog] = useState(false);

  const token = Cookies.get("token");
  const mutation = useMutation({
    mutationFn: async (data) => await getCustomerGameDetails(data),
  });

  useEffect(() => {
    if (Object.keys(customer).length) {
      mutation.mutate({ token, customer_Id: customer.customer_ID });
    }
  }, [customer]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogContent>
          {mutation.isPending ? (
            <>
              <div className="flex items-center gap-3">
                <p>مشخصات</p>
                <Skeleton width={130} height={30} />
                <Skeleton width={130} height={30} />
              </div>
              <Skeleton width={"100%"} height={80} />
            </>
          ) : (
            <>
              {" "}
              <p className="mb-5">
                مشخصات{" "}
                {`${mutation.data?.result.firstName}  ${mutation.data?.result.lastName}`}
              </p>
              <TableContainer component={Paper}>
                <Table
                  sx={{ "& th, & td": { whiteSpace: "nowrap" } }}
                  size="medium"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>بازی</TableCell>
                      <TableCell>ساعت حضور</TableCell>
                      <TableCell>برنده</TableCell>
                      <TableCell>زمان حضور</TableCell>
                      <TableCell>وضعیت حضور</TableCell>
                      <TableCell>کد رهگیری</TableCell>
                      <TableCell>توضیحات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mutation.data?.result.games.map((game) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={game.id}
                      >
                        <TableCell>{game.name}</TableCell>
                        <TableCell>{game.hourPresent || "وارد نشده"}</TableCell>
                        <TableCell>
                          {game.isWinner ? (
                            <IoMdCheckmark className="text-green-600 text-xl" />
                          ) : (
                            <RiCloseLargeFill className="text-red-600 text-xl" />
                          )}
                        </TableCell>
                        <TableCell>{game.timePresent || "وارد نشده"}</TableCell>
                        <TableCell>
                          {game.isPresentOnTime === 0 ? (
                            "مسابقه شروع نشده"
                          ) : game.isPresentOnTime === 1 ? (
                            <IoMdCheckmark className="text-green-600 text-xl" />
                          ) : game.isPresentOnTime === 2 ? (
                            <RiCloseLargeFill className="text-red-600 text-xl" />
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell>{game.trackingCode}</TableCell>
                        <TableCell>
                          {game.message ? (
                            <>
                              <Button onClick={() => setDateDialog(true)}>
                                تنظیم تاریخ و ساعت
                              </Button>
                              <SetPresenceDate
                                open={dateDialog}
                                onClose={() => setDateDialog(false)}
                                mutation={mutation}
                                customer={customer}
                              />
                            </>
                          ) : (
                            "تاریخ و ساعت در نظر گرفته شده است."
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerDetails;
