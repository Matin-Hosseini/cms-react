import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../requests/user";

export const userUserInfoQuery = (token) => {
  if (token) {
    console.log(
      "token is provided in userUserInfoQuery and i returning the query"
    );
    return useQuery({
      queryKey: ["user-info"],
      queryFn: getUserInfo(token),
    });
  }

  console.log("token is not provided returning nothing");
};
