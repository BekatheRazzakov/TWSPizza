import React from 'react';
import {IMeal} from "../../type";
import {useAppDispatch} from "../../app/hook";
import {deleteMeal, fetchList} from "../../PizzaThunk";
import './mealCard.css';

interface IProps {
  meal: IMeal,
}

const MealCard: React.FC<IProps> = ({meal}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className='card meal-card p-2'
    >
      <div className='meal-img'>
        <img src={meal.image} alt="meal"/>
      </div>
      <div className='info'>
        <strong>{meal.title}</strong>
        <strong>{meal.price}KGS</strong>
      </div>
      <div className='buttons'>
        <button className="btn btn-primary">Edit</button>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await dispatch(deleteMeal(meal.id));
            await dispatch(fetchList());
          }}
        >Delete</button>
      </div>
    </div>
  );
};

export default MealCard;