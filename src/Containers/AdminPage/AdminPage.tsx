import React from 'react';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import './adminPage.css';

const AdminPage = () => {
  const location = useLocation();

  return (
    <>
      <div className='admin-page d-flex m-auto justify-content-between align-items-center pt-3'>
        <h1>TWS Pizza</h1>
        <div className='nav-links d-flex align-items-end gap-5'>
          <NavLink to='/admin/meals'>
            <h4>Meals</h4>
          </NavLink>
          <NavLink to='/admin/orders'>
            <h4>Orders</h4>
          </NavLink>
        </div>
      </div>
      {
        location.pathname === '/admin' &&
        <div className='mt-5 text-light pt-3'>
            <h1>Hello, Admin!</h1>
            <h5 className='w-25 m-auto mt-3'>Press any of the buttons on the top right to edit meals or see active orders</h5>
        </div>
      }
      <Outlet />
    </>
  );
};

export default AdminPage;