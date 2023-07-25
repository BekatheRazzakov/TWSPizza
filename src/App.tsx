import React from 'react';
import {Route, Routes} from "react-router-dom";
import AdminPage from "./Containers/AdminPage/AdminPage";
import './App.css';
import Dishes from "./Components/Dishes/Dishes";
import Orders from "./Components/Orders/Orders";
import AddMeal from "./Components/AddMeal/AddMeal";

const App = () => (
  <div className="App">
    <div className='background'></div>
    <div style={{position: 'relative', zIndex: '2'}}>
      <Routes>
        <Route path='/admin' element={<AdminPage />}>
          <Route path='meals' element={<Dishes />} />
          <Route path='orders' element={<Orders />} />
          <Route path='add-meal' element={<AddMeal />} />
        </Route>
        <Route path='/' element={<h1>Hello, Customer</h1>} />
      </Routes>
    </div>
  </div>
);

export default App;
