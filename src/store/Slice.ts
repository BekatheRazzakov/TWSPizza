import {createSlice} from "@reduxjs/toolkit";
import {addMeal, deleteMeal, fetchMeal, fetchList} from "../PizzaThunk";
import {IState} from "../type";

const initialState: IState = {
  mealList: [],
  listLoading: false,
  addMealLoading: false,
  deletingMeal: false,
  meal: {
    title: '',
    price: '',
    image: '',
    id: '',
  },
  mealLoading: false,
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

    builder.addCase(addMeal.pending, state => {
      state.addMealLoading = true;
    });
    builder.addCase(addMeal.fulfilled, state => {
      state.addMealLoading = false;
    });
    builder.addCase(addMeal.rejected, state => {
      state.addMealLoading = false;
    });

    builder.addCase(fetchMeal.pending, state => {
      state.mealLoading = true;
    });
    builder.addCase(fetchMeal.fulfilled, (state, action) => {
      if (action.payload) {
        state.meal = action.payload;
        state.mealLoading = false;
      }
    });
    builder.addCase(fetchMeal.rejected, state => {
      state.mealLoading = false;
    });

    builder.addCase(deleteMeal.pending, state => {
      state.deletingMeal = true;
    });
    builder.addCase(deleteMeal.fulfilled, state => {
      state.deletingMeal = false;
    });
    builder.addCase(deleteMeal.rejected, state => {
      state.deletingMeal = false;
    });
  },
});

export const PizzaReducer = PizzaSlice.reducer;
export const {} = PizzaSlice.actions;