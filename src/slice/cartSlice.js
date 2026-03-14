import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0,
    final_total: 0,
  },
  //actions
  reducers: {
    updateCart(state, action) {
      state.carts = action.payload.carts;
      state.total = action.payload.total;
      state.final_total = action.payload.final_total;
    },
  },
});
export const createAsyncGetCart = createAsyncThunk(
  "cart/createAsyncGetCart",
  async (_, { dispatch }) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      console.log(res.data);
      dispatch(updateCart(res.data.data));
    } catch (error) {
      console.log(error);
    }
  },
);

export const createAsyncAddCart = createAsyncThunk(
  "cart/createAsyncAddCart",
  async ({ id, qty }, { dispatch }) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {data});
      console.log(res.data);
      //重新取得資料
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.log(error);
    }
  },
);

export const createAsyncDeleteCart = createAsyncThunk(
  "cart/createAsyncDeleteCart",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      console.log(res.data);
      //重新取得資料
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.log(error);
    }
  },
);

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
