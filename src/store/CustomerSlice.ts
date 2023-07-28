import {createSlice} from "@reduxjs/toolkit";
import {sendOrder} from "./CustomerThunk";
import {ICustomerState} from "../type";

const initialState: ICustomerState = {
  orderLoading: false,
};

export const PizzaSlice = createSlice({
  name: 'Pizza',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendOrder.pending, state => {
      state.orderLoading = true;
    });
    builder.addCase(sendOrder.fulfilled, (state) => {
      state.orderLoading = false;
    });
    builder.addCase(sendOrder.rejected, state => {
      state.orderLoading = false;
    });
  },
});

export const CustomerReducer = PizzaSlice.reducer;