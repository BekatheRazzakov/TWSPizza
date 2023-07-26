import React from 'react';
import {IMeal, IMealMutation} from "../../type";
import './customerMealCard.css';

interface IProps {
  meal: IMeal,
  mealClicked: (meal: IMealMutation) => void,
}

const CustomerMealCard: React.FC<IProps> = ({meal, mealClicked}) => {
  return (
    <div className='card customer-meal-card d-grid p-2'>
      <div className='ps-2'>
        <img className='w-100' src={meal.image} alt="meal"/>
      </div>
      <div className='d-flex flex-column'>
        <strong className='meal-title m-auto'>{meal.title}</strong>
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <strong className='meal-price ps-1'>{meal.price}KGS</strong>
          <button
            className="btn btn-primary add-to-cart-btn p-1 pt-2 pb-2"
            onClick={() => mealClicked({
              title: meal.title,
              price: meal.price,
              image: meal.image,
              id: meal.id,
              amount: 1,
            })}
          >Add to orders</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerMealCard;