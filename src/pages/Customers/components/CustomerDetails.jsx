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
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import SetPresenceDate from "./SetPresenceDate";
import { setWinner } from "../../../services/requests/gaming";
import { useSnackbar } from "../../../contexts/snackbar";

const CustomerDetails = ({ open, customer, onClose }) => {
  const [dateDialog, setDateDialog] = useState(false);

  const { showSnackbar } = useSnackbar();

  const token = Cookies.get("token");
  const mutation = useMutation({
    mutationFn: async (data) => await getCustomerGameDetails(data),
  });
  const setWinnerMutation = useMutation({
    mutationFn: async (data) => await setWinner(data),
    onSuccess: (data) => {
      showSnackbar(
        `${customer.firstName} ${customer.lastName} در ${data.result.titleGaming} به عنوان برنده اعلام شد.`
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (Object.keys(customer).length) {
      mutation.mutate({ token, customer_Id: customer.customer_ID });
    }
  }, [customer]);

  const setWinnerHandler = (gamingID) => {
    setWinnerMutation.mutate({ token, gamingID });
  };

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
                      <TableCell>رده بندی</TableCell>
                      <TableCell>ساعت حضور</TableCell>
                      <TableCell>زمان حضور</TableCell>
                      <TableCell>برنده</TableCell>
                      <TableCell>حضور به موقع</TableCell>
                      <TableCell>کد رهگیری</TableCell>
                      {mutation.data?.result.games.map((game) => (
                        <React.Fragment key={game.id}>
                          {game.games ? (
                            game.games.map((gameDetail) =>
                              gameDetail.isPresentOnTime !== 0 ? (
                                <TableCell key={gameDetail.game_ID}>
                                  نتیجه
                                </TableCell>
                              ) : (
                                <></>
                              )
                            )
                          ) : (
                            <></>
                          )}
                        </React.Fragment>
                      ))}
                      <TableCell>توضیحات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mutation.data?.result.games.map((game) => (
                      <React.Fragment key={game.id}>
                        {game.games ? (
                          game.games.map((gameDetail) => (
                            <TableRow
                              key={gameDetail.game_ID}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>{game.name}</TableCell>
                              <TableCell>{gameDetail.titleItem}</TableCell>
                              <TableCell>
                                {gameDetail.hourPresent || "وارد نشده"}
                              </TableCell>
                              <TableCell>
                                {gameDetail.timePresent || "وارد نشده"}
                              </TableCell>
                              <TableCell>
                                {gameDetail.isWinner ? (
                                  <IoMdCheckmark className="text-green-600 text-xl" />
                                ) : (
                                  <RiCloseLargeFill className="text-red-600 text-xl" />
                                )}
                              </TableCell>

                              <TableCell>
                                {gameDetail.isPresentOnTime === 0 ? (
                                  "مسابقه شروع نشده"
                                ) : gameDetail.isPresentOnTime === 1 ? (
                                  <IoMdCheckmark className="text-green-600 text-xl" />
                                ) : gameDetail.isPresentOnTime === 2 ? (
                                  <RiCloseLargeFill className="text-red-600 text-xl" />
                                ) : (
                                  ""
                                )}
                              </TableCell>
                              <TableCell>
                                {gameDetail.trackingCode || "بدون کد رهگیری"}
                              </TableCell>
                              {gameDetail.isPresentOnTime !== 0 ? (
                                <TableCell>
                                  <Button
                                    disabled={!gameDetail.isWinner}
                                    onClick={() =>
                                      setWinnerHandler(gameDetail.game_ID)
                                    }
                                  >
                                    اعلام به عنوان برنده
                                  </Button>
                                </TableCell>
                              ) : (
                                <></>
                              )}
                              <TableCell>
                                {gameDetail.message ? (
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
                                  "تاریخ و ساعت حضور در نظر گرفته شده است."
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell>{game.name}</TableCell>
                            <TableCell>وارد نشده</TableCell>
                            <TableCell>درنظر گرفته نشده</TableCell>
                            <TableCell>درنظر گرفته نشده</TableCell>
                            <TableCell>نامشخص</TableCell>
                            <TableCell>بازی شروع نشده</TableCell>
                            <TableCell>{game.trackingCode}</TableCell>
                            <TableCell>
                              <Button onClick={() => setDateDialog(true)}>
                                تنظیم تاریخ و ساعت
                              </Button>
                              <SetPresenceDate
                                open={dateDialog}
                                onClose={() => setDateDialog(false)}
                                mutation={mutation}
                                customer={customer}
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
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
