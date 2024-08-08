import AddCup from "./Components/AddCup";
import AllCups from "./Components/AllCups";

const Cup = () => {
  return (
    <div>
      <div className=" mb-6">
        <AddCup />
      </div>
      <AllCups />
    </div>
  );
};

export default Cup;
