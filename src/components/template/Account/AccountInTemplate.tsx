import { Tabs } from "components/ui";
import styleAuth from "../../layouts/index.module.scss";
import styles from "./index.module.scss";
import cn from "classnames";
import AccountInfoTab from "./AccountInfoTab.tsx";
import AccountTicketTab from "./AccountTicketTab.tsx";
;

export const AccountInTemplate = () => {
  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className={cn(styleAuth.account, "")}></div>
      {/* //mo dau */}
      <div className={cn(styles.inputFormLogin, "")}>
        {/* Tab */}
        <div className="w-full h-full relative">
            <Tabs
                tabPosition="left"
                className="h-full"
                tabBarGutter={-5}
                items={[
                    {
                        label: (
                            <div className="w-full text-left hover:bg-gray-400 hover:text-blue-600 rounded-lg transition-all p-10 text-white">
                                Thông tin tài khoản
                            </div>
                        ),
                        key: 'accountInfo',
                        children: <AccountInfoTab />,
                    },
                    {
                        label: (
                            <div className="w-full text-left hover:bg-gray-400 hover:text-blue rounded-lg transition-all p-10 text-white">
                                Thông tin vé đã đặt
                            </div>
                        ),
                        key: 'ticketInfo',
                        children: <AccountTicketTab/>,
                    },
                ]}
            />
        </div>
        {/* End Tab */}
      </div>
    </div>
  );
};

export default AccountInTemplate;
