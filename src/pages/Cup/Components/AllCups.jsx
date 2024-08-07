import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCups } from "../../../services/requests/cup";
import { useAuthContext } from "../../../contexts/auth";
import CupBox from "./CupBox";
import CupBoxSkeleton from "./CupBox/Skeleton";

const AllCups = () => {
  const { token } = useAuthContext();

  const query = useQuery({
    queryKey: ["cups"],
    queryFn: async () =>
      getAllCups({
        token,
        title: null,
        typeOfCap: null,
      }),
  });

  return (
    <div>
      <h2 className="font-[Persian-titraj] text-4xl text-violet-500 mb-4">
        تمامی کاپ ها
      </h2>

      <div className="grid xs:grid-cols-[repeat(auto-fill,_minmax(250px,_auto))]  gap-3 transition">
        {query.isPending &&
          Array.from(Array(4).keys()).map((item) => (
            <CupBoxSkeleton key={item} />
          ))}

        {query.isSuccess &&
          query.data.result.caps.map((cup) => <CupBox key={cup.id} {...cup} />)}
      </div>
    </div>
  );
};

export default AllCups;
