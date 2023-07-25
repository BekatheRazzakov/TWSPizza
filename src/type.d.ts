export interface IMeal {
  title: string,
  price: string,
  image: string,
  id: string,
}

export interface IState {
  mealList: IMeal[],
  listLoading: boolean,
}