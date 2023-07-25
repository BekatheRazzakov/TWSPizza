import React, {ChangeEvent, useState} from 'react';
import './addMeal.css';
import {TMeal} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {addMeal} from "../../PizzaThunk";
import {useNavigate} from "react-router-dom";

const AddMeal = () => {
  const [meal, setMeal] = useState<TMeal>({
    title: '',
    price: '',
    image: '',
  });

  const dispatch = useAppDispatch();
  const initState = useAppSelector(state => state.pizzaState);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setMeal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='container'>
      <h1>Add new meal</h1>
      <form
        className='w-50 m-auto mt-4 d-flex flex-column gap-3'
        onSubmit={async (e) => {
          await e.preventDefault();
          await dispatch(addMeal(meal));
          await navigate('/admin/meals');
        }}
      >
        <input
          className='form-control'
          name='title'
          type="text"
          placeholder='Meal name'
          value={meal.title}
          onChange={onChange}
          required
        />
        <input
          className='form-control'
          name='price'
          type="number"
          placeholder='Meal price'
          value={meal.price}
          onChange={onChange}
          required
        />
        <input
          className='form-control'
          name='image'
          type="url"
          placeholder='Meal image'
          value={meal.image}
          onChange={onChange}
        />
        <button className="btn btn-primary" type='submit'>
          {
            initState.addMealLoading ?
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              : 'Add'
          }
        </button>
      </form>
    </div>
  );
};

export default AddMeal;