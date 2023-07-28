import React, {useState} from 'react';
import {IMeal} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {deleteMeal, fetchList} from "../../store/PizzaThunk";
import './mealCard.css';
import {Link} from "react-router-dom";

interface IProps {
  meal: IMeal,
}

const MealCard: React.FC<IProps> = ({meal}) => {
  const [mealID, setMealID] = useState('');

  const dispatch = useAppDispatch();
  const initState = useAppSelector(state => state.pizzaState);

  return (
    <div
      className='card meal-card p-2 ps-3 pe-3'
    >
      <div className='meal-img'>
        <img src={meal.image} alt="meal"/>
      </div>
      <div className='info'>
        <strong>{meal.title}</strong>
        <strong>{meal.price}KGS</strong>
      </div>
      <div className='buttons'>
        <Link
          className="btn btn-primary"
          to={`/admin/edit-meal/${meal.id}`}
        >Edit</Link>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await setMealID(meal.id);
            await dispatch(deleteMeal(meal.id));
            await dispatch(fetchList());
          }}
          disabled={initState.deletingMeal && mealID === meal.id}
        >
          {
            initState.deletingMeal && mealID === meal.id ?
              <div className="justify-content-center spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              : 'Delete'
          }
        </button>
      </div>
    </div>
  );
};

export default MealCard;