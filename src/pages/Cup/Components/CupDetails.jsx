import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";
import { getCupItems } from "../../../services/requests/cup";
import { useEffect, useState } from "react";
import { getWinners } from "../../../services/requests/gaming";
import Winners from "./Winners";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DialogHeader from "../../../components/DialogHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

const CupDetails = () => {
  const [open, setOpen] = useState(false);

  const { cupId } = useParams();
  const { token } = useAuthContext();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const cupDetailsMutation = useMutation({
    mutationFn: async (data) => await getCupItems(data),
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const winnersMutation = useMutation({
    mutationFn: async (data) => await getWinners(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    cupDetailsMutation.mutate({ token, typeOfRegister_ID: cupId });
  }, []);

  const winnersHandler = (itemId) => {
    console.log(itemId);
    setOpen(true);

    winnersMutation.mutate({ token, typeOfRegisterItem_ID: itemId });
  };

  return (
    <div>
      <h1 className="font-[persian-titraj] text-5xl text-green-600 mt-4">
        رده بندی ها
      </h1>

      {cupDetailsMutation.data?.result.capItems.map((item) => (
        <div key={item.id}>
          {item.title}
          {/* <Winners itemId={item.id} /> */}
          <Button onClick={() => winnersHandler(item.id)}>
            مشاهده برنده ها
          </Button>
        </div>
      ))}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={"md"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={`برندگان رده بندی`}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          {!winnersMutation.data?.result ? (
            <div className="h-full text-4xl flex items-center justify-center text-red-500">
              برنده ای یافت نشد.
            </div>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table
                  sx={{ "& th, & td": { whiteSpace: "nowrap" } }}
                  size="medium"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>نام</TableCell>
                      <TableCell>نام خانوادگی</TableCell>
                      <TableCell>موبایل</TableCell>
                      <TableCell>کد ملی</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {winnersMutation.data?.result?.customersWinner.map(
                      (winner) => (
                        <TableRow key={winner.id}>
                          <TableCell>{winner.firstName}</TableCell>
                          <TableCell>{winner.lastName}</TableCell>
                          <TableCell>{winner.phoneNumber}</TableCell>
                          <TableCell>{winner.nationalCode}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CupDetails;
