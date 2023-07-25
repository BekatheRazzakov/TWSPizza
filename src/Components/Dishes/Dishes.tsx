import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchList} from "../../PizzaThunk";
import './dishes.css';
import {Link} from "react-router-dom";

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
        <Link to=''>
          <button className="btn btn-primary">
            Add new dish
          </button>
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
                      <div
                        className='card meal-card p-2'
                        key={index}
                      >
                        <div className='meal-img'>
                          <img src={meal.image} alt="meal"/>
                        </div>
                        <div className='info'>
                          <strong>Name: {meal.title}</strong>
                          <strong>Price: {meal.price}KGS</strong>
                        </div>
                        <div className='buttons'>
                          <button className="btn btn-primary">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </div>
                      </div>
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