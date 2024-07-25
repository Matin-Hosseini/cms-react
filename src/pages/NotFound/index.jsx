import notFoundImg from "./../../assets/images/not-found.jpg";

const NotFound = () => {
  return (
    <div className="h-[calc(100dvh-124px)] flex flex-col gap-5 items-center justify-center">
      <img
        src={notFoundImg}
        alt="صفحه مورد نظر یافت نشد."
        className="max-w-[550px]"
      />
      <h2 className="font-[Persian-titraj] text-5xl text-blue-300">
        صفحه مورد نظر شما یافت نشد
      </h2>
    </div>
  );
};

export default NotFound;
