import { useSelector } from "react-redux";
import { RootState } from "store";

export const useAdmin = () => {
  const { DSUser, isDelete, page, timKiemUser, UpdateUser } = useSelector(
    (state: RootState) => state.quanTri
  );
  return { DSUser, isDelete, page, timKiemUser, UpdateUser };
};
