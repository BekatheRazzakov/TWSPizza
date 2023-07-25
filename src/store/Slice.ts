import {createSlice} from "@reduxjs/toolkit";
import {fetchList} from "../PizzaThunk";
import {IState} from "../type";

const initialState: IState = {
  mealList: [],
  listLoading: false,
};

export const PizzaSlice = createSlice({
  name: 'Pizza',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchList.pending, state => {
      state.listLoading = true;
    });
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.mealList = action.payload;
      state.listLoading = false;
    });
    builder.addCase(fetchList.rejected, state => {
      state.listLoading = false;
    });
  },
});

export const PizzaReducer = PizzaSlice.reducer;
export const {} = PizzaSlice.actions;