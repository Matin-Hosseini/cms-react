import { Button } from "@mui/material";
import { red } from "@mui/material/colors";

/**
 * @param {import('@mui/material/Button').ButtonProps} props
 */

const CategoryBtnBox = ({ title, iconSrc, ...props }) => {
  return (
    <Button
      {...props}
      variant="outlined"
      className={`flex items-center justify-start  gap-6 flex-1 text-md bg-blue-400 text-white py-7 ${props?.className} w-full border-none`}
    >
      <img src={iconSrc} alt={title} className="w-[40px]" />
      {title}
    </Button>
  );
};

export default CategoryBtnBox;
