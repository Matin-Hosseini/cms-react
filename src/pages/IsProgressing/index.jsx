import codingGif from "./../../assets/gifs/coding.gif";

const IsProgressing = () => {
  return (
    <div className="h-[calc(100dvh-124px)] flex flex-col items-center justify-center gap-5">
      <img
        src={codingGif}
        alt="در حال توسعه"
        className="max-w-[500px] w-[90%]"
      />
      <div>
        <h2 className="font-[Persian-titraj] text-3xl md:text-4xl text-[#6E6F71]  text-center">
          این صفحه در دست توسعه می باشد. از صبر و شکیبایی شما سپاسگذاریم.
        </h2>
      </div>
    </div>
  );
};

export default IsProgressing;
