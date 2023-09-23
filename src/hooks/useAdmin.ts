import { useSelector } from "react-redux";
import { RootState } from "store";

export const useAdmin = () => {
  const { DSUser, isDelete, page } = useSelector((state: RootState) => state.quanTri);
  return { DSUser, isDelete, page };
};
