import ErrorLayout from "../../components/ErrorLayout";
import codingGif from "./../../assets/gifs/coding.gif";

const IsProgressing = () => {
  return (
    <ErrorLayout
      img={codingGif}
      title={"این صفحه در حال توسه می باشد. از صبر و شکیبایی شما سپاسگذاریم."}
    />
  );
};

export default IsProgressing;
