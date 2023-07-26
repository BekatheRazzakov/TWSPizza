import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import MealCard from "../../Components/MealCard/MealCard";
import {fetchList} from "../../PizzaThunk";
import CustomerMealCard from "../../Components/CustomerMealCard/CustomerMealCard";

const CustomerPage = () => {
  const dispatch = useAppDispatch();
  const initState = useAppSelector(state => state.pizzaState);

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return (
    <div className='container pt-3'>
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
                <div className=''>
                  {
                    initState.mealList.map((meal, index) => (
                      <CustomerMealCard
                        meal={meal}
                        key={index}
                      />
                    ))
                  }
                </div>

          }
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;