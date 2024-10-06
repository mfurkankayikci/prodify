import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
};

export const fetchProducts = createAsyncThunk("products", async () => {
  const { data } = await axios.get(
    "https://5fc9346b2af77700165ae514.mockapi.io/products"
  );

  return data;
});

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;

        state.isLoading = false;
      });
  },
});

export const { isLoading } = (state) => state;
export default productSlice.reducer;
