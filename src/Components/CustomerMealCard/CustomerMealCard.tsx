import React from 'react';
import {IMeal} from "../../type";

interface IProps {
  meal: IMeal,
}

const CustomerMealCard: React.FC<IProps> = ({meal}) => {
  return (
    <div className='card customer-meal-card'>

    </div>
  );
};

export default CustomerMealCard;