import React, {useEffect} from 'react';
import './orders.css';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchOrders} from "../../PizzaThunk";

const Orders = () => {
  const initState = useAppSelector(state => state.pizzaState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className='container'>
      <h1>Orders</h1>
      <div className='card orders-block p-2 mt-3 m-auto gap-2'>
        {
          initState.ordersList.map((ordersContainer, index) => (
            <div
              className='card p-2 pe-1 d-flex flex-row'
              key={index}
            >
              <div className='d-flex flex-column justify-content-center w-75 gap-2'>
                {
                  ordersContainer.orders.map((order, index) => (
                    <div
                      className='d-flex justify-content-between'
                      key={index}
                    >
                        <span className='w-25'>{order.title}</span>
                        <span className='w-25 text-center'>{order.amount}x</span>
                        <span className='w-25 text-center me-5'>{order.price}KGS</span>
                      </div>
                  ))
                }
              </div>
              <div className="w-25 d-flex flex-column justify-content-around">
                <div>
                  <span className='font-13'>Total + deliver: </span>
                  <strong className='font-12'>
                    {
                      ordersContainer.orders.reduce((acc, value) => {
                        return acc + parseFloat(value.price) * value.amount;
                      }, 150)
                    }KGS
                  </strong>
                </div>
                <div className='mt-3'>
                  <span className='font-15 completed'>Order completed</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;