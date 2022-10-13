import React,{useState} from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './comps/dashboard.js';
import Post_food from './comps/post-food';
import UserProfile from './comps/UserProfile';
import Login from './comps/Login.js';
import Show from './comps/show_food';
import Demo from './comps/demo';
import Av from './comps/available';



function App() {

  return (
     
    <BrowserRouter>
    <Routes>

        <Route path="/Dashboard/user_profile" element={<UserProfile/>}></Route>
         <Route path='/' element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard/post-food" element={<Post_food/>}/>
          <Route path="/Dashboard/show_food" element={<Show/>}></Route>
          <Route path="/demo" element={<Demo/>}></Route>
          <Route path="/dashboard/available" element={<Av/>}></Route>

    </Routes>
  </BrowserRouter>
  
  );
}
export default App;
