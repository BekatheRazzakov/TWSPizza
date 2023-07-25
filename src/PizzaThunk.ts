import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "./axiosApi";
import {IMeal, TMeal} from "./type";

export const fetchList = createAsyncThunk(
  'TWSPizza/fetchList',
  async () => {
    let list: IMeal[] = [];
    await axiosApi('/admin/dishes.json')
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
  async (meal: TMeal) => {
    await axiosApi.post('/admin/dishes.json', meal);
  },
);

export const deleteMeal = createAsyncThunk(
  'TWSPizza/delete',
  async (id: string) => {
    await axiosApi.delete(`/admin/dishes/${id}.json`);
  },
);