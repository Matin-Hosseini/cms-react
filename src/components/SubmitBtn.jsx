import { Button } from "@mui/material";
import ThreeDotsLoading from "./ThreeDotLoading";

/**
 * @param {import('@mui/material/Button').ButtonProps} props
 */

const SubmitBtn = ({ children, isSubmitting, ...props }) => {
  return (
    <Button
      {...props}
      type={props.type || "submit"}
      disabled={isSubmitting || props.disabled}
      variant={props.variant || "contained"}
      className={`h-12 flex items-center justify-center ${
        props.backGround ||
        "bg-gray-500 disabled:text-gray-200 disabled:opacity-70"
      } ${props.className}`}
      fullWidth={props.fullWidth || true}
    >
      {isSubmitting ? <ThreeDotsLoading color={"#fff"} /> : <>{children}</>}
    </Button>
  );
};

export default SubmitBtn;
