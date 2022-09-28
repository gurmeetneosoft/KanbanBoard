import React from 'react';
import {Route, Routes} from "react-router-dom"

import Navbar from './Components//Navbar/Navbar';
import FormSignUp from './Components/Register/Form';
import FormSignIn from './Components/Register/FormSignin';
import Dashboard from './Components/Dashboard/Dashboard';
import TaskManager from './Components/TaskManager/TaskManager';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path='/' element={<FormSignUp/>}/>
        <Route path='/signin' element={<FormSignIn/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/taskmanager' element={<TaskManager />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

