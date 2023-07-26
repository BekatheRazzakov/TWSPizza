import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchList, sendOrder} from "../../PizzaThunk";
import CustomerMealCard from "../../Components/CustomerMealCard/CustomerMealCard";
import './customerPage.css';
import {IMealMutation} from "../../type";
import Checkout from "../../Components/Checkout/Checkout";

const CustomerPage = () => {
  const [orders, setOrders] = useState<IMealMutation[]>([]);
  const [checkout, setCheckout] = useState(false);

  const dispatch = useAppDispatch();
  const initState = useAppSelector(state => state.pizzaState);

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  const sum = orders.reduce((acc, value) => {
    return acc + parseFloat(value.price) * value.amount;
  }, 0);

  const mealClicked = async (meal: IMealMutation) => {
    const ordersCopy = [...orders];

    if (orders.filter(order => order.id === meal.id).length !== 0) {
      orders.filter(order => order.id === meal.id)[0].amount++
    } else {
      ordersCopy.push(meal);
    }
    setOrders(ordersCopy);
  };

  const changeStatus = () => {
    setCheckout(!checkout);
  };

  const removeOne = (id: string) => {
    if (orders.length === 1 && orders[0].amount === 1) {
      setCheckout(false);
    }

    let clickedOrder = orders.filter(order => order.id === id)[0];

    const ordersCopy = [...orders];

    if (clickedOrder.amount > 1) {
      ordersCopy.filter(order => order.id === id)[0].amount--;
      setOrders(ordersCopy);
    } else if (clickedOrder.amount === 1) {
      setOrders(ordersCopy.filter(order => order.id !== id));
    }
  };

  const orderClicked = async () => {
    const idRemoved = orders.map(({ title, price, image, amount }) => ({ title, price, image, amount }));
    await dispatch(sendOrder(idRemoved));
    await setOrders([]);
    await setCheckout(false);
  };

  return (
    <div className='customer-page'>
      <div className='container pt-3'>
        {
          checkout &&
            <Checkout
                changeStatus={changeStatus}
                orders={orders}
                sum={sum}
                removeOne={removeOne}
                orderClicked={orderClicked}
            />
        }
        <div className='d-flex flex-column w-75 m-auto'>
          <h1 className='align-self-start'>TWS Pizza</h1>
          <div className='card p-3 mt-3'>
            {
              initState.listLoading ?
                <div className="justify-content-center spinner-border text-primary m-auto" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                :
                initState.mealList.length === 0 ?
                  <h3>No meal in menu</h3>
                  :
                  <>
                    <div className='p-2 pt-0 mb-3 d-flex justify-content-between align-items-center'>
                      <h4>
                        Total price: {sum}KGS
                      </h4>
                      <button
                        className="btn btn-primary"
                        onClick={changeStatus}
                        disabled={orders.length === 0}
                      >
                        Checkout
                      </button>
                    </div>
                    <div className='d-flex flex-wrap justify-content-around customer-meal-list'>
                      {
                        initState.mealList.map((meal, index) => (
                          <CustomerMealCard
                            meal={meal}
                            mealClicked={mealClicked}
                            key={index}
                          />
                        ))
                      }
                    </div>
                  </>

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;