import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from '../../services/productService';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const res = await fetchProducts();
  return res.products;
});

export const getCategories = createAsyncThunk('products/getCategories', async () => {
  const res = await fetchCategories();
  return res;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    categories: [],
    loading: false,
  },
  reducers: {
    filterByCategory: (state, action) => {
      const selected = action.payload;
      if (selected === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(item => item.category === selected);
      }
    },
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload; // ✅ Important to render initially
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  }
});

export const { filterByCategory, searchProducts } = productSlice.actions;
export default productSlice.reducer;
