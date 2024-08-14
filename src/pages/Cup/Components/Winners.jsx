import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getWinners } from "../../../services/requests/gaming";
import { useAuthContext } from "../../../contexts/auth";

const Winners = ({ itemId }) => {
  console.log(itemId);
  const { token } = useAuthContext();

  const winnersMutation = useMutation({
    mutationFn: async (data) => await getWinners(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    winnersMutation.mutate({ token, typeOfRegisterItem_ID: itemId });
  }, []);
  return (
    <div>
      {winnersMutation?.data?.result?.customersWinner.map((winner) => (
        <div key={winner.id}>{winner.firstName}</div>
      ))}
    </div>
  );
};

export default Winners;
