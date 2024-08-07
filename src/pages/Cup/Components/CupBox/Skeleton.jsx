import { Skeleton } from "@mui/material";

export default function CupBoxSkeleton() {
  return (
    <div className="border rounded-lg flex flex-col gap-3 items-center justify-between p-4 h-[270px]">
      <Skeleton width={160} height={120} />
      <Skeleton width={65} height={20} />
      <Skeleton width={190} height={20} />
      <Skeleton width="100%" height={45} />
    </div>
  );
}
