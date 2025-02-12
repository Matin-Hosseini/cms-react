import { Box, Dialog, DialogContent, Tab, Tabs } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import { useSnackbar } from "../../../contexts/snackbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import sendSmsIcon from "./../../../assets/icons/sms/send-sms.png";
import PropTypes from "prop-types";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import WithHasPermission from "../../../HOCs/WithHasPermission";
import SendCustomSms from "./SendCustomSms";
import SendSmsWithCategory from "./SendSmsWithCategory";
import SendSalesPdfSms from "./SendSalesPdfSms";

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

  const token = Cookies.get("token");

  const { showSnackbar } = useSnackbar();

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
                aria-label="send-sms-tabs"
              >
                {/* <WithHasPermission permissionName={"SendSmsForCallCenter"}>
                  <Tab
                    onClick={() => setValue(0)}
                    className="flex-1"
                    label="ارسال با دسته بندی"
                    {...a11yProps(2)}
                  />
                </WithHasPermission> */}
                <WithHasPermission permissionName={"SendSmsForCallCenter"}>
                  <Tab
                    onClick={() => setValue(0)}
                    className="flex-1"
                    label="ارسال دلخواه"
                    {...a11yProps(0)}
                  />
                </WithHasPermission>

                <WithHasPermission permissionName={"SendSmsForCallCenter"}>
                  <Tab
                    onClick={() => setValue(1)}
                    className="flex-1"
                    label="ارسال PDF فروش"
                    {...a11yProps(1)}
                  />
                </WithHasPermission>
              </Tabs>
            </Box>

            {/* <WithHasPermission permissionName={"SendSmsToAnyOne"}>
              <CustomTabPanel value={value} index={0}>
                <SendSmsWithCategory />
              </CustomTabPanel>
            </WithHasPermission> */}

            <WithHasPermission permissionName={"SendSmsForCallCenter"}>
              <CustomTabPanel value={value} index={0}>
                <SendCustomSms />
              </CustomTabPanel>
            </WithHasPermission>

            <WithHasPermission permissionName={"SendSmsToAnyOne"}>
              <CustomTabPanel value={value} index={1}>
                <SendSalesPdfSms />
              </CustomTabPanel>
            </WithHasPermission>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
