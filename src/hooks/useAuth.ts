import { useSelector } from "react-redux";
import { RootState } from "store";

export const useAuth = () => {
  const { accessToken, user, isUpdateUser,isLogin } = useSelector(
    (state: RootState) => state.quanLyNguoiDung
  );
  return { accessToken, user, isUpdateUser,isLogin };
};

