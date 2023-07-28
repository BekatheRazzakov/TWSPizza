import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICartMeal} from "../type";
import {axiosApi} from "../axiosApi";

export const sendOrder = createAsyncThunk(
  'TWSPizza/sendOrder',
  async (order: ICartMeal) => {
    await axiosApi.post('/orders.json', order);
  },
);