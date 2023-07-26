import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "./axiosApi";
import {IFetchOrders, IMeal, IOrderMeal} from "./type";

export const fetchList = createAsyncThunk(
  'TWSPizza/fetchList',
  async () => {
    let list: IMeal[] = [];
    await axiosApi('/dishes.json')
      .then(response => {
        list = Object.keys(response.data).map(pizza => ({
          ...response.data[pizza],
          id: pizza,
        }))
      });

    return list;
  }
);

export const addMeal = createAsyncThunk(
  'TWSPizza/add',
  async (meal: IMeal) => {
    await axiosApi.post(`/dishes/.json`, {
      title: meal.title,
      price: meal.price,
      image: meal.image,
    });
  },
);

export const editMeal = createAsyncThunk(
  'TWSPizza/edit',
  async (meal: IMeal) => {
    await axiosApi.put(`/dishes/${meal.id}.json`, {
      title: meal.title,
      price: meal.price,
      image: meal.image,
    });
  },
);

export const fetchMeal = createAsyncThunk(
  'TWSPizza/fetchOne',
  async (id: string) => {
    let meal = null;

    await axiosApi(`/dishes/${id}.json`)
      .then(response => {
        meal = response.data;
        meal.id = id;
      });

    return meal;
  },
);

export const deleteMeal = createAsyncThunk(
  'TWSPizza/delete',
  async (id: string) => {
    await axiosApi.delete(`/dishes/${id}.json`);
  },
);

export const sendOrder = createAsyncThunk(
  'TWSPizza/sendOrder',
  async (order: IOrderMeal[]) => {
    await axiosApi.post('/orders.json', order);
  },
);

export const fetchOrders = createAsyncThunk(
  'TWSPizza/fetchOrders',
  async () => {
    let list: IFetchOrders[] = []
    await axiosApi('/orders.json')
      .then(response => {
        Object.keys(response.data).forEach((key: string) => {
          list.push({
            id: key,
            orders: response.data[key]});
        })
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