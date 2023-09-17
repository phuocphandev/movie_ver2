import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import { getUserThunk } from "./quanLyNguoiDung/thunk";
import { quanLyRapThunk } from "./quanLyRap/thunk";

export const store = configureStore({
  reducer: rootReducer,
});
store.dispatch(getUserThunk())
store.dispatch(quanLyRapThunk())
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =(typeof store.dispatch);
export const useAppDispatch : () => AppDispatch = useDispatch;

