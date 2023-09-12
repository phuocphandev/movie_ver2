import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchemaType } from "schema/LoginSchema";
import { quanLyNguoiDung } from "services";

export const loginThunk = createAsyncThunk(
  "quanLyNguoiDung/loginThunk",
  async (payload: LoginSchemaType, { rejectWithValue }) => {
    try {
      const data = await quanLyNguoiDung.login(payload);
      return data.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
