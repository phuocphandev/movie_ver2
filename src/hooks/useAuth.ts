import { useSelector } from "react-redux";
import { RootState } from "store";

export const useAuth = () => {
  const { accessToken, user, isUpdateUser } = useSelector(
    (state: RootState) => state.quanLyNguoiDung
  );
  return { accessToken, user, isUpdateUser };
};

