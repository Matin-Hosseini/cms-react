const ErrorLayout = ({ img, title }) => {
  return (
    <div className="h-[calc(100dvh-124px)] flex flex-col gap-5 items-center justify-center">
      <img src={img} alt={title} className="max-w-[550px] w-[90%]" />
      <h2 className="font-[Persian-titraj] text-5xl text-blue-300 text-center">
        {title}
      </h2>
    </div>
  );
};

export default ErrorLayout;
