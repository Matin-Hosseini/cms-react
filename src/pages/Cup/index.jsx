import AddCup from "./Components/AddCup";
import AddCupItem from "./Components/AddCupItem";
import AllCups from "./Components/AllCups";

const Cup = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <AddCup />
        <AddCupItem />
      </div>
      <AllCups />
      <h2>صفحه کاپ</h2>
    </div>
  );
};

export default Cup;
