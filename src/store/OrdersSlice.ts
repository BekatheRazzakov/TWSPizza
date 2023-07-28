import {createSlice} from "@reduxjs/toolkit";
import {fetchOrders, orderCompleted} from "./OrdersThunk";
import {IOrdersState} from "../type";

const initialState: IOrdersState = {
  ordersList: [],
  orderListLoading: false,
  orderCompleted: false,
};

export const PizzaSlice = createSlice({
  name: 'Pizza',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrders.pending, state => {
      state.orderListLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersList = action.payload;
      state.orderListLoading = false;
    });
    builder.addCase(fetchOrders.rejected, state => {
      state.orderListLoading = false;
    });

    builder.addCase(orderCompleted.pending, state => {
      state.orderCompleted = true;
    });
    builder.addCase(orderCompleted.fulfilled, state => {
      state.orderCompleted = false;
      if (state.ordersList.length === 1) {
        state.ordersList = [];
      }
    });
    builder.addCase(orderCompleted.rejected, state => {
      state.orderCompleted = false;
    });
  }
});

export const OrdersReducer = PizzaSlice.reducer;