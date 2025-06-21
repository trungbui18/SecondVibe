// store/cartSelectedSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDetail } from "@/types/cartDetail";

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
