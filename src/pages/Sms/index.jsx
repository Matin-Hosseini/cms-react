import AddSMSCategory from "./components/AddSmsCategory";
import SendSms from "./components/SendSms";

import AllSmsCategories from "./components/AllSmsCategories";
import { useAuthContext } from "../../contexts/auth";
import WithPermission from "../../HOCs/withPermission";
import AllSentMessages from "./components/AllSentMessages";

const Sms = () => {
  const {
    userInfo: { permissions },
  } = useAuthContext();

  const SendSmsWithPermission = WithPermission(SendSms, 22);

  const AllSmsCategoriesWithPermission = WithPermission(AllSmsCategories, 24);

  const AddSmsCategoryWithPermission = WithPermission(AddSMSCategory, 23);

  const SentMessagesWithPermission = WithPermission(AllSentMessages, 29);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <SendSmsWithPermission />
        <AddSmsCategoryWithPermission />
        <AllSmsCategoriesWithPermission />
      </div>
      <SentMessagesWithPermission />
    </div>
  );
};

export default Sms;
