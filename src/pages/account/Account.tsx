import { Outlet } from "react-router-dom";
import styles from './index.module.scss';

export const Account = () => {
  return (
    <div className={styles.account}>
      <div className={styles.accountLeft}></div>
      <Outlet />
      <div className={styles.accountRight}></div>
    </div>
  );
};

export default Account;
