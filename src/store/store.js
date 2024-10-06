import { configureStore } from "@reduxjs/toolkit";
import shoppingCardReducer from "./shoppingCardSlice";
import productReducer from "./productSlice";
import filterReducer from "./filtersSlice";

const store = configureStore({
  reducer: {
    productSlice: productReducer,
    filtersSlice: filterReducer,
    shoppingCardSlice: shoppingCardReducer,
  },
});

export default store;
