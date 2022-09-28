import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';

const Form = () => {
  const navigate = useNavigate();
  function submitForm(values) {
    localStorage.setItem("user-data", JSON.stringify(values));
    alert("Register Successfully")
    navigate('/signin')
    localStorage.setItem("kanban-data", null );
  }
  return (
    <>
      <div className='form_container'>
        <div className='form_content_left'>
          <img className='form_img' src='https://www.littlethings.info/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg' alt='spaceship' />
        </div>
          <FormSignup submitForm={submitForm} />
      </div>
    </>
  );
};

export default Form;