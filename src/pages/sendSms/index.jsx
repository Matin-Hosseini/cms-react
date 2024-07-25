import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../axios/api";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import { BiSad } from "react-icons/bi";
import ThreeDotsLoading from "../../components/ThreeDotLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValid, z } from "zod";
import { sendSMSSchema } from "../../validations/schemas/panelSms";
import { useSnackbar } from "../../contexts/snackbar";
import SendToMany from "./components/SendToMany";
import SubmitBtn from "../../components/SubmitBtn";
import SendToSingle from "./components/SendToSingle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { IoClose } from "react-icons/io5";
import { TbMessage2Plus } from "react-icons/tb";

import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SendSms() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [notAuthorized, setNotAuthorized] = useState(false);

  const [number, setNumber] = useState("");

  const phoneRef = useRef(null);

  const [how, setHow] = useState("single");

  const [messages, setMessages] = useState([]);

  const token = Cookies.get("token");

  const getSmsCategories = async () => {
    try {
      const res = await Api.post("/PanelSms/GetAllTextMessage", { token });

      setMessages(res.data.result.messages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setNotAuthorized(true);
      } else {
        setSnackbarTitle("خطا در برقراری ارتباط");
      }
    }
  };

  useEffect(() => {
    getSmsCategories();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="flex flex-col items-center justify-center gap-6 flex-1 text-3xl"
      >
        <TbMessage2Plus className="text-6xl" />
        ارسال پیام جدید
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        // sx={{
        //   "& .MuiDialog-container > .MuiPaper-root": {
        //     minWidth: "600px",
        //     height: "100% !important",
        //   },
        // }}
      >
        <Box className="flex items-center justify-between">
          <DialogTitle id="alert-dialog-title">ارسال پیام</DialogTitle>
          <IconButton onClick={handleClose} className="ml-4">
            <IoClose />
          </IconButton>
        </Box>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab className="flex-1" label="ارسال تکی" {...a11yProps(0)} />
                <Tab
                  className="flex-1"
                  label="ارسال چند تایی"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SendToSingle messages={messages} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SendToMany messages={messages} />
            </CustomTabPanel>
          </Box>
          {/* {notAuthorized ? (
            <div className="border border-dashed border-red-400 text-red-400 h-24 flex items-center justify-center">
              <BiSad className="text-[2rem] ml-3" />
              <p>شما دسترسی لازم به این صفحه را ندارید.</p>
            </div>
          ) : (
            <>
              <div className="max-w-96 mx-auto mt-5">
                <FormControl className="mb-5">
                  <FormLabel id="demo-radio-buttons-group-label">
                    نحوه ارسال
                  </FormLabel>
                  <RadioGroup
                    defaultValue={how}
                    name="how-to-send-radio-group"
                    value={how}
                    onChange={(e) => setHow(e.target.value)}
                  >
                    <FormControlLabel
                      value="single"
                      control={<Radio />}
                      label="تکی"
                    />
                    <FormControlLabel
                      value="multiple"
                      control={<Radio />}
                      label="چندتایی"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {how === "single" ? (
                <SendToSingle messages={messages} />
              ) : (
                <SendToMany messages={messages} />
              )}
            </>
          )} */}
        </DialogContent>
      </Dialog>
    </>
  );
}
