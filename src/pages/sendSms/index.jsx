import {
  Button,
  Chip,
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

export default function SendSms() {
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

  return (
    <>
      {notAuthorized ? (
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
      )}

      
    </>
  );
}
