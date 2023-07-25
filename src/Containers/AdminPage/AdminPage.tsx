import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import './adminPage.css';

const AdminPage = () => {
  return (
    <>
      <div className='admin-page d-flex m-auto justify-content-between align-items-center pt-3'>
        <h2>TWS Pizza</h2>
        <div className='nav-links d-flex align-items-end gap-5'>
          <NavLink to='/admin/meals'>
            <h4>Meals</h4>
          </NavLink>
          <NavLink to='/admin/orders'>
            <h4>Orders</h4>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminPage;