import { Skeleton } from "@mui/material";

export default function ChairSkeleton() {
  return (
    <div className="flex flex-col items-center border rounded-lg p-4">
      <Skeleton width={50} height={80} />
      <Skeleton width={130} height={20} />
      <Skeleton width={"100%"} height={40} />
    </div>
  );
}
