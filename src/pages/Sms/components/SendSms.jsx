import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Tab,
  Tabs,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import { useSnackbar } from "../../../contexts/snackbar";
import SendToMany from "./SendToMany";
import SendToSingle from "./SendToSingle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import sendSmsIcon from "./../../../assets/icons/sms/send-sms.png";
import PropTypes from "prop-types";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import WithPermission from "../../../HOCs/withPermission";
import WithHasPermission from "../../../HOCs/WithHasPermission";

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

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState([]);

  const token = Cookies.get("token");

  const { showSnackbar } = useSnackbar();

  const getSmsCategories = async () => {
    try {
      const res = await Api.post("/PanelSms/GetAllTextMessage", { token });

      setMessages(res.data.result.messages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showSnackbar("شما دسترسی به این قسمت ندارد.");
      } else {
        showSnackbar("خطا در برقراری ارتباط");
      }
    }
  };

  useEffect(() => {
    getSmsCategories();
  }, []);

  return (
    <div>
      <CategoryBtnBox
        title="ارسال پیام جدید"
        iconSrc={sendSmsIcon}
        onClick={handleClickOpen}
      />
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"md"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"ارسال پیام جدید"}
          onClose={handleClose}
          belowMediaQuery={isBelowMd}
        />

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
              <WithHasPermission permissionName={"SendSmsToAnyOne"}>
                <SendToSingle messages={messages} />
              </WithHasPermission>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SendToMany messages={messages} />
            </CustomTabPanel>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
