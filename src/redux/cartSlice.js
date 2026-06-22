import { createSlice } from "@reduxjs/toolkit";
import { products } from "../constants/products"; // Ensure this path correctly targets your static products data file

export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    addItem: (state, action) => {
      // 1. Extract the ID cleanly whether the payload is an object or a raw number/string ID
      const payloadId = 
        action.payload && typeof action.payload === "object" 
          ? action.payload.id 
          : action.payload;

      if (!payloadId) return; // Safeguard against completely empty payloads

      // 2. Find if the item already exists in the cart array
      const itemExists = state.value.find(
        (item) => item.id === Number(payloadId)
      );

      if (itemExists) {
        // 3. Directly increment quantity (Immer automatically handles immutability)
        itemExists.quantity += 1;
      } else {
        // 4. Find the full structural product from your database file
        const staticProduct = products.find(
          (product) => product.id === Number(payloadId)
        );

        // 5. Safely push a clean copy of the product with an initial quantity of 1
        if (staticProduct) {
          state.value.push({
            ...staticProduct,
            quantity: 1,
          });
        }
      }
    },
    removeItem: (state, action) => {
      // Reassign state array filtering out the targeted item
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    decrementQuantity: (state, action) => {
      const itemExists = state.value.find((item) => item.id === action.payload);
      if (itemExists) {
        if (itemExists.quantity === 1) {
          // If quantity drops to 0, completely drop it from the array list
          state.value = state.value.filter((item) => item.id !== action.payload);
        } else {
          itemExists.quantity -= 1;
        }
      }
    },
    emptyCart:(state)=>{
      state.value = [];
    },
  },
});

export const { addItem, removeItem, decrementQuantity, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
