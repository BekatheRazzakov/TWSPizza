import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchList} from "../../PizzaThunk";
import './dishes.css';
import {Link} from "react-router-dom";
import MealCard from "../MealCard/MealCard";

const Dishes = () => {
  const initState = useAppSelector(state => state.pizzaState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between w-75 m-auto'>
        <h2>Menu</h2>
        <Link  className="btn btn-primary" to='/admin/add-meal'>
          Add new dish
        </Link>
      </div>
      <div className='mt-4 d-flex justify-content-center'>
        {
          initState.listLoading ?
            <div className="justify-content-center spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :
            initState.mealList.length === 0 ?
              <h3>No meal in menu</h3>
              :
              <div className='list card d-flex w-75'>
                <div className='list-inner'>
                  {
                    initState.mealList.map((meal, index) => (
                      <MealCard
                        meal={meal}
                        key={index}
                      />
                    ))
                  }
                </div>
              </div>

        }
      </div>
    </div>
  );
};

export default Dishes;