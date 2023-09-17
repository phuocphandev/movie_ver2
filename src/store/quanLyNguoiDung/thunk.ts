import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountSchemaType } from "schema";
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
export const getUserThunk = createAsyncThunk(
  "quanLyNguoiDung/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("USER");
      if (accessToken) {
        const data = await quanLyNguoiDung.getUser();
        return data.data.content;
      }
      return undefined;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "quanLyNguoiDung/updateUserThunk",
  async(payload: AccountSchemaType, {rejectWithValue,dispatch}) => {
    try {
      await quanLyNguoiDung.updateUser(payload);
      await new Promise((resolve)=>setTimeout(resolve,1000))
      dispatch(getUserThunk())
      // console.log("update data: ", data)
    } catch (error) {
      rejectWithValue(error);
    }
  }
)
