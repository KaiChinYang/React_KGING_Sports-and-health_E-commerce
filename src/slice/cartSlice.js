import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateCartQtyApi,
  sendOrderApi,
  getSingleOrderApi,
  payOrderApi,
  deleteSingleCartQtyApi,
  addToCartApi,
  getCartApi,
  clearCartQtyApi,
} from "../services/cart";
import { createAsyncMessage } from "./messageSlice";

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
      const res = await getCartApi();
      dispatch(updateCart(res.data.data));

      dispatch(
        createAsyncMessage({
          success: true,
          message: "更新購物車成功",
        }),
      );
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "更新購物車失敗",
        }),
      );
      throw error;
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
      await addToCartApi(data);
      //重新取得資料
      dispatch(createAsyncGetCart());

      dispatch(
        createAsyncMessage({
          success: true,
          message: "加入購物車成功",
        }),
      );
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "加入購物車失敗",
        }),
      );
      throw error;
    }
  },
);

export const createAsyncDeleteCart = createAsyncThunk(
  "cart/createAsyncDeleteCart",
  async (id, { dispatch }) => {
    try {
      await deleteSingleCartQtyApi(id);
      //重新取得資料
      dispatch(createAsyncGetCart());
      dispatch(
        createAsyncMessage({
          success: true,
          message: "刪除商品成功",
        }),
      );
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "刪除商品失敗",
        }),
      );
      throw error;
    }
  },
);
export const createAsyncClearCart = createAsyncThunk(
  "cart/createAsyncClearCart",
  async (_, { dispatch }) => {
    try {
      await clearCartQtyApi();
      //重新取得資料
      dispatch(createAsyncGetCart());
      dispatch(
        createAsyncMessage({
          success: true,
          message: "清空購物車成功",
        }),
      );
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "清空購物車失敗",
        }),
      );
      throw error;
    }
  },
);

export const createAsyncUpdateCartQty = createAsyncThunk(
  "cart/createAsyncUpdateCartQty",
  async ({ cartId, productId, qty }, { dispatch }) => {
    try {
      const data = {
        product_id: productId,
        qty,
      };
      await updateCartQtyApi(cartId, data);
      dispatch(createAsyncGetCart());
      dispatch(
        createAsyncMessage({
          success: true,
          message: "更新商品數量成功",
        }),
      );
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "更新商品數量失敗",
        }),
      );
      throw error;
    }
  },
);

//送出訂單
export const createAsyncSendOrder = createAsyncThunk(
  "cart/createAsyncSendOrder",
  async (data, { dispatch }) => {
    try {
      const res = await sendOrderApi(data);
      dispatch(createAsyncGetCart());
      dispatch(
        createAsyncMessage({
          success: true,
          message: "送出訂單成功",
        }),
      );
      return res.data.orderId;
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "送出訂單失敗",
        }),
      );
      throw error;
    }
  },
);

//取得訂單詳情
export const createAsyncGetSingleOrder = createAsyncThunk(
  "cart/createAsyncGetSingleOrder",
  async (orderId, { dispatch }) => {
    try {
      const res = await getSingleOrderApi(orderId);
      dispatch(
        createAsyncMessage({
          success: true,
          message: "成功取得訂單詳情",
        }),
      );
      return res.data.order;
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "取得訂單詳情失敗",
        }),
      );
      throw error;
    }
  },
);

//付款
export const createAsyncPayOrder = createAsyncThunk(
  "cart/createAsyncPayOrder",
  async (orderId, { dispatch }) => {
    try {
      await payOrderApi(orderId);
      // return res.data.order;
      dispatch(
        createAsyncMessage({
          success: true,
          message: "付款成功",
        }),
      );
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: "付款失敗，請稍後再試",
        }),
      );
      throw error;
    }
  },
);

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
