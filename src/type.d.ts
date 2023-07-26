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

export interface IState {
  mealList: IMeal[],
  ordersList: IFetchOrders[],
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
  orderLoading: boolean
  orderListLoading: boolean,
  orderCompleted: boolean;
}

export interface IOrderMeal {
  title: string,
  price: string,
  image: string,
  amount: number,
}

export interface IFetchOrders {
  id: string,
  orders: IOrderMeal[],
}