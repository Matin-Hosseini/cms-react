import { Skeleton } from "@mui/material";

const TableSkeleton = () => {
  return (
    <div className="border border-gray-300 p-4">
      <div className="flex gap-4">
        {[...Array(4).keys()].map((item) => (
          <Skeleton key={item} width={80} height={40} animation="wave" />
        ))}
      </div>

      {[...Array(8).keys()].map((item) => (
        <div className="flex items-center gap-2" key={item}>
          <Skeleton width={25} height={35} animation="wave" />
          <Skeleton width={"100%"} height={60} animation="wave" />
        </div>
      ))}

      <div className="flex items-center gap-3 justify-end">
        {[...Array(3).keys()].map((item) => (
          <Skeleton width={80} height={40} animation="wave" />
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
