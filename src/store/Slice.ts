import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

export const PizzaSlice = createSlice({
  name: 'Pizza',
  initialState,
  reducers: {},
});

export const PizzaReducer = PizzaSlice.reducer;
export const {} = PizzaSlice.actions;