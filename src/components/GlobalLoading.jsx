import { Dialog } from "@mui/material";
import Logo from "./Logo";
import WobblingLoading from "./Loadings/Wobbling";
import ThreeDotsLoading from "./ThreeDotLoading";

const GlobalLoading = () => {
  return (
    <>
      <Dialog open={true}>
        <div className="w-56 py-3 flex flex-col items-center gap-5">
          <Logo />
          <ThreeDotsLoading color="#ccc"/>
        </div>
      </Dialog>
    </>
  );
};

export default GlobalLoading;
