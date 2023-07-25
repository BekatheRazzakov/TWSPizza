import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "./axiosApi";
import {IMeal} from "./type";

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