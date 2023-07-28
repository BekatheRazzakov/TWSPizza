import {createAsyncThunk} from "@reduxjs/toolkit";
import {IFetchOrders} from "../type";
import {axiosApi} from "../axiosApi";

export const fetchOrders = createAsyncThunk(
  'TWSPizza/fetchOrders',
  async () => {
    let list: IFetchOrders[] = [];
    await axiosApi('/orders.json')
      .then(response => {
        list = Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key,
        }));
      });
    return list;
  },
);

export const orderCompleted = createAsyncThunk(
  'TWSPizza/orderCompleted',
  async (id: string) => {
    await axiosApi.delete(`/orders/${id}.json`);
  },
);