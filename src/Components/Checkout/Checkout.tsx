import React from 'react';
import './checkout.css';
import {IMealMutation} from "../../type";
import {useAppSelector} from "../../app/hook";

interface IProps {
  changeStatus: () => void,
  orders: IMealMutation[],
  sum: number,
  removeOne: (id: string) => void,
  orderClicked: () => void,
}

const Checkout: React.FC<IProps> = ({changeStatus, orders, sum, removeOne, orderClicked}) => {
  const initState = useAppSelector(state => state.pizzaState);

  return (
    <div className="card checkout d-flex align-items-center p-5">
      <div className="checkout-inner card mt-5 p-3">
        <div
          className='btn-close'
          onClick={changeStatus}
        />
        <div className='orders mt-4 pt-2 d-flex flex-column gap-2'>
          {
            orders.map((order, index) => (
              <div
                className='card p-2 d-flex flex-row justify-content-between'
                key={index}
              >
                <span className='order-title'>{order.title}</span>
                <span>{order.amount}x</span>
                <span className='order-price'>{order.price}KGS</span>
                <button
                  className='remove-btn'
                  onClick={() => removeOne(order.id)}
                />
              </div>
            ))
          }
        </div>
        <strong className='ms-auto mt-3'>Delivery: 150KGS</strong>
        <strong className='ms-auto'>Total: {sum + 150} KGS</strong>
        <div className='d-flex justify-content-evenly mt-2'>
          <button
            className="btn btn-danger"
            onClick={changeStatus}
          >Cancel</button>
          <button
            className="btn btn-primary"
            onClick={orderClicked}
            disabled={initState.orderLoading}
          >Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;