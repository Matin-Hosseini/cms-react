import AddSMSCategory from "./components/AddSmsCategory";
import SendSms from "./components/SendSms";
import AllSentSMSs from "./components/AllSentMessages";
import AllSmsCategories from "./components/AllSmsCategories";

const Sms = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row  gap-3 my-5 [&>div]:flex-1">
        <SendSms />
        <AddSMSCategory />
        <AllSmsCategories />
      </div>
      <AllSentSMSs />
    </div>
  );
};

export default Sms;
