export interface IMeal {
  title: string,
  price: string,
  image: string,
  id: string,
}

export interface IMealMutation {
  title: string,
  price: string,
  image: string,
  id: string,
  amount: number,
}

export interface IFetchOrders {
  [id: string]: string,
}

export interface IDishesState {
  mealList: IMeal[],
  listLoading: boolean,
  addMealLoading: boolean,
  deletingMeal: boolean,
  meal: {
    title: string,
    price: string,
    image: string,
    id: string,
  },
  mealLoading: boolean,
}

export interface ICustomerState {
  orderLoading: boolean,
}

export interface IOrdersState {
  ordersList: IFetchOrders[],
  orderListLoading: boolean,
  orderCompleted: boolean;
}

export interface ICartMeal {
  [id: string]: number,
}

export interface IOrderMeal {
  title: string,
  price: string,
  amount: string,
  id: string,
}