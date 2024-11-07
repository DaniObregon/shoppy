import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción para obtener los detalles del producto desde la API
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
