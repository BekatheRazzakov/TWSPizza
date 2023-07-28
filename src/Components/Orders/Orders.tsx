import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchOrders, orderCompleted} from "../../store/OrdersThunk";
import './orders.css';
import {IOrderMeal} from "../../type";
import {fetchList} from "../../store/PizzaThunk";

const Orders = () => {
  const [completedOrderID,setCompletedOrderID] = useState('');
  const initState = useAppSelector(state => state.pizzaState);
  const ordersState = useAppSelector(state => state.ordersState);
  const dispatch = useAppDispatch();
  const orders: IOrderMeal[][] = [];

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchList());
  }, [dispatch]);
  const totals: number[] = [];

  ordersState.ordersList.forEach((order) => {
    const ordersMeals: IOrderMeal[] = [];
    Object.keys(order).map((key) => {
      ordersMeals.push({
        title: initState.mealList.filter(meal => meal.id === key)[0]?.title,
        price: initState.mealList.filter(meal => meal.id === key)[0]?.price,
        amount: order[key].toString(),
        id: order.id,
      });
    });
    orders.push(ordersMeals);
  });

  orders.forEach((order) => {
    let total = 0;
    order.forEach(meal => {
      if (parseFloat(meal.price)) {
        total += parseFloat(meal.price);
      }
    });
    totals.push(total);
  });

  return (
    <div className='container'>
      <h1>Orders</h1>
      <div className="orders-list card p-2 gap-3 d-flex m-auto mt-3 w-75">
        {
          ordersState.orderListLoading ?
            <div className="justify-content-center spinner-border text-primary m-auto" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :
            ordersState.ordersList.length === 0 ?
              <h2>No active orders yet</h2>
              :
              orders.map((order: IOrderMeal[], index: number) => (
                <div className='card d-flex flex-row p-2' key={index}>
                  <div className='d-flex flex-column justify-content-center p-2 gap-1 w-68'>
                    {
                      order.map((meal: IOrderMeal, index: number) => (
                        meal.title &&
                        <div className='d-flex align-items-center text-center' key={index}>
                            <strong className='w-32 f-16'>{meal.title}</strong>
                            <strong className='w-32 f-16 ms-auto'>{meal.price}KGS</strong>
                            <span className='w-32'>{meal.amount}x</span>
                        </div>
                      ))
                    }
                  </div>
                  <div className='w-32 d-flex flex-column align-items-center'>
                <span className='mt-auto mb-2'>
                  Total + deliver:
                  <strong className='f-16'> {totals[index] + 150}KGS</strong>
                </span>
                    <button
                      className='btn btn-success f-12 p-1 ps-2 pe-2 mb-auto'
                      onClick={async () => {
                        await setCompletedOrderID(order[0].id);
                        await dispatch(orderCompleted(order[0].id));
                        await dispatch(fetchOrders());
                      }}
                      disabled={ordersState.orderCompleted && completedOrderID === order[0].id}
                    >Order completed</button>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  );
};

export default Orders;