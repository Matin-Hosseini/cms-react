import AddSMSCategory from "./components/AddSmsCategory";
import SendSms from "../sendSms";
import AllSentSMSs from "./components/AllSentMessages";

const Sms = () => {
  return (
    <div>
      <div className="flex  gap-3 my-5">
        <SendSms />
        <AddSMSCategory />
      </div>
      <AllSentSMSs />
    </div>
  );
};

export default Sms;
