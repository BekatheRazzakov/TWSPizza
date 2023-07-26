import React, {ChangeEvent, useEffect, useState} from 'react';
import {IMeal} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {addMeal, fetchMeal} from "../../PizzaThunk";
import {useNavigate, useParams} from "react-router-dom";

const AddMeal = () => {
  const {id} = useParams() as {id: string};

  const [meal, setMeal] = useState<IMeal>({
    title: '',
    price: '',
    image: '',
    id: '',
  });

  const dispatch = useAppDispatch();
  const initState = useAppSelector(state => state.pizzaState);
  const navigate = useNavigate();

  const setValues = async () => {
    await dispatch(fetchMeal(id));
    await setMeal(prevState => ({
      ...prevState,
      title: initState.meal.title,
      price: initState.meal.price,
      image: initState.meal.image,
      id: initState.meal.id,
    }));
  };

  useEffect(() => {
    if (id) {
      void setValues();
    }
  }, [meal.id]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setMeal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='container d-flex flex-column align-items-center'>
      <h1>
        {
          id ? `Edit ${initState.meal.title}` : 'Add new meal'
        }
      </h1>
      {
        initState.mealLoading ?
          <div className="m-auto spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          :
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
                  :
                  id ? 'Save' : 'Add'
              }
            </button>
          </form>
      }
    </div>
  );
};

export default AddMeal;