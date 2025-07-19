// store/cartSelectedSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDetail } from "@/types/cartDetail";
import { ApiResponse } from "@/types/apiResponse";
import { CartResponse } from "@/types/cart";

const initialState: CartDetail[] = [];

const cartSelectedSlice = createSlice({
  name: "cartSelected",
  initialState,
  reducers: {
    setSelectedItems: (state, action: PayloadAction<CartDetail[]>) => {
      return action.payload;
    },
    clearSelectedItems: () => {
      return [];
    },
  },
});

export const { setSelectedItems, clearSelectedItems } =
  cartSelectedSlice.actions;
export default cartSelectedSlice.reducer;

// Slice lưu số lượng sản phẩm trong giỏ hàng
const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: 0,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setCartCount } = cartCountSlice.actions;
export const cartCountReducer = cartCountSlice.reducer;

// Slice lưu dữ liệu getCart
const cartDataSlice = createSlice({
  name: "cartData",
  initialState: null as ApiResponse<CartResponse> | null,
  reducers: {
    setCartData: (
      state,
      action: PayloadAction<ApiResponse<CartResponse> | null>
    ) => action.payload,
  },
});

export const { setCartData } = cartDataSlice.actions;
export const cartDataReducer = cartDataSlice.reducer;
