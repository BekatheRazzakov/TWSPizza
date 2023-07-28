import {configureStore} from "@reduxjs/toolkit";
import {PizzaReducer} from "../store/DishesSlice";
import {CustomerReducer} from "../store/CustomerSlice";
import {OrdersReducer} from "../store/OrdersSlice";

export const store = configureStore({
  reducer: {
    pizzaState: PizzaReducer,
    customerState: CustomerReducer,
    ordersState: OrdersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;