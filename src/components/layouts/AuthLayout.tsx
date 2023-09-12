import { Navigate, Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import cn from "classnames";
import { useAuth } from "hooks/useAuth";

export const AuthLayout = () => {
  const { user } = useAuth();
  //1 hook thì gọi hook khác, function k gọi hook
  if (user) {
    return <Navigate to="/"  />; //return về một component
  }
  return (
    <div className={cn(styles.account, "flex items-center")}>
      <div className={styles.accountLeft}></div>
      <Outlet />
      <div className={styles.accountRight}></div>
    </div>
  );
};

export default AuthLayout;
