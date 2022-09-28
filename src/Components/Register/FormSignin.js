import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { validateSignIn } from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignIn = () => {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateSignIn
  );

  function submitForm(values) {
    const userData = JSON.parse(localStorage.getItem("user-data")) || null
    if((values.username === userData.username || values.username === userData.email) &&  values.password === userData.password){
      navigate('/dashboard')
      localStorage.setItem("isLogin", true)
    }else{
      alert("Opps, username or password is wrong!!!")
    }

  }

  return (
    <div className='form_container_signin'>
    <div className='form_content_right_signin'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <div className='form_inputs'>
          <label className='form_label'>Username/Email</label>
          <input
            className='form_input'
            type='text'
            name='username'
            placeholder='Enter your username or email'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
       
        <div className='form_inputs'>
          <label className='form_label'>Password</label>
          <input
            className='form_input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className='form_input_btn' type='submit'>
          Login
        </button>
        <span className='form_input_login'>
          Already have an account? Sign up <Link to='/'>here</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default FormSignIn;