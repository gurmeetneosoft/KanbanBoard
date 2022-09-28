import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form_content_right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form_inputs'>
          <label className='form_label'>Name</label>
          <input
            className='form_input'
            type='text'
            name='name'
            placeholder='Enter your name'
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form_inputs'>
          <label className='form_label'>Username</label>
          <input
            className='form_input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form_inputs'>
          <label className='form_label'>Email</label>
          <input
            className='form_input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form_inputs'>
          <label className='form_label'>Contact Number</label>
          <input
            className='form_input'
            type='text'
            name='number'
            placeholder='Enter your contact number'
            value={values.number}
            onChange={handleChange}
          />
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
        <div className='form_inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form_input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form_input_btn' type='submit'>
          Sign up
        </button>
        <span className='form_input_login'>
          Already have an account? Login <Link to='/signin'>here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;