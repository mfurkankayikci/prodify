import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  orderBy: "new-to-old",
  brands: [],
  models: [],
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setModels: (state, action) => {
      state.models = action.payload;
    },
  },
});

export const getAllFilters = createSelector(
  [(state) => state.filtersSlice],
  (filters) => ({
    searchTerm: filters.searchTerm,
    orderBy: filters.orderBy,
    brands: filters.brands
      .filter((item) => item.checked)
      .map((item) => item.value),
    models: filters.models
      .filter((item) => item.checked)
      .map((item) => item.value),
  })
);

export const { setSearchTerm, setOrderBy, setBrands, setModels } =
  filtersSlice.actions;
export default filtersSlice.reducer;
