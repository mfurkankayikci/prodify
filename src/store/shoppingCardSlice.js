import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("shoppingCardItems")) || [],
  isVisible:
    JSON.parse(localStorage.getItem("shoppingCardVisibility")) || false,
};

const shoppingCardSlice = createSlice({
  name: "shoppingCardSlice",
  initialState,
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    addItem: (state, action) => {
      state.isVisible = true;
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("shoppingCardItems", JSON.stringify(state.items));
      localStorage.setItem(
        "shoppingCardVisibility",
        JSON.stringify(state.isVisible)
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      state.isVisible = state.items.length !== 0;
      localStorage.setItem("shoppingCardItems", JSON.stringify(state.items));
      localStorage.setItem(
        "shoppingCardVisibility",
        JSON.stringify(state.isVisible)
      );
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;

      localStorage.setItem("shoppingCardItems", JSON.stringify(state.items));
      localStorage.setItem(
        "shoppingCardVisibility",
        JSON.stringify(state.isVisible)
      );
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const item = state.items[itemIndex];

      if (!item) return;

      if (item.quantity === 1) {
        state.items.splice(itemIndex, 1); // Direct mutation allowed by immer
      } else {
        item.quantity -= 1;
      }

      localStorage.setItem("shoppingCardItems", JSON.stringify(state.items));
      localStorage.setItem(
        "shoppingCardVisibility",
        JSON.stringify(state.isVisible)
      );
    },
  },
});

export const {
  setIsVisible,
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = shoppingCardSlice.actions;
export default shoppingCardSlice.reducer;
