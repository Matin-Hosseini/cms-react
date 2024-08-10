import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTables, updateChair } from "../../services/requests/tables";
import { useAuthContext } from "../../contexts/auth";
import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { PiOfficeChairLight } from "react-icons/pi";
import GlobalLoading from "../../components/GlobalLoading";
import ChairSkeleton from "./ChairSkeleton";

const compareChairs = (newChairs, oldChairs) => {
  const changedChairs = newChairs.filter((newChair, index) => {
    return newChair.isSit !== oldChairs[index].isSit;
  });

  return changedChairs;
};

const Tables = () => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  const { data, isPending } = useQuery({
    queryKey: ["chairs"],
    queryFn: async () => getAllTables({ token, isSit: true }),
    refetchInterval: 10000,
  });

  if (data) {
    const chairs = localStorage.getItem("chairs");

    if (!chairs) {
      localStorage.setItem("chairs", JSON.stringify(data.result.places));
      return;
    }

    const changedChairs = compareChairs(data.result.places, JSON.parse(chairs));
    if (changedChairs.length === 1) {
      showSnackbar(
        `${changedChairs[0].name} ${changedChairs[0].isSit ? "پر" : "خالی"} شد.`
      );
    } else if (changedChairs.length > 1) {
      const changedChairNumbers = changedChairs.map((chair) => chair.id);
      showSnackbar(`صندلی های ${changedChairNumbers.join()} تغییر کردند.`);
    }

    localStorage.setItem("chairs", JSON.stringify(data.result.places));
  }

  const updateChairMutation = useMutation({
    mutationFn: async (data) => await updateChair(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["chairs"]);
    },
  });

  const updateChairHandler = (chair) => {
    updateChairMutation.mutate({ token, ...chair, isSit: !chair.isSit });
  };

  return (
    <>
      <div>
        <h2 className="font-[persian-titraj] text-4xl mb-8 text-blue-400">
          وضعیت صندلی ها
        </h2>
        <Alert className="mb-5">
          کاربر گرامی وضعیت پر یا خالی بودن صندلی ها هر 10 ثانیه یکبار بروز
          خواهد شد. برای اطلاع از وضعیت صندلی ها نیاز به رفرش پشت سر هم نیست.
        </Alert>

        <div className="grid sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-3">
          {isPending &&
            Array.from(Array(10).keys()).map((item) => (
              <ChairSkeleton key={item} />
            ))}

          {data?.result.places.map((chair) => (
            <div
              className={`relative border ${
                chair.isSit
                  ? "border-green-300 text-green-500"
                  : "border-red-300 text-red-500"
              } p-4`}
              key={chair.id}
            >
              <div className="text-center mb-8">
                <PiOfficeChairLight className="text-3xl mb-3 mx-auto" />
                <span>{chair.name}</span>
              </div>

              <Button
                onClick={() => updateChairHandler(chair)}
                variant="contained"
                className="bg-lime-600 text-sm"
                fullWidth
              >
                تغییر وضعیت به {chair.isSit ? "خالی" : "پر"} شده
              </Button>

              <div
                className={`absolute -top-2 -left-2 ${
                  chair.isSit ? "bg-green-300" : "bg-red-300"
                } text-white w-8 h-8 rounded-full flex items-center justify-center text-xs`}
              >
                {chair.isSit ? "پر" : "خالی"}
              </div>
            </div>
          ))}
        </div>
      </div>
      {updateChairMutation.isPending && <GlobalLoading />}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </>
  );
};

export default Tables;
