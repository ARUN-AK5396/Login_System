import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../SignUpValidation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCalendar, faVenus, faMars, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import './SignupScreenStyle.css'

function SignUpScreen() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    age: '',
    dob: '',
    gender: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = Validation(values);
    setErrors(formErrors);
  
    if (
      Object.keys(formErrors).every((key) => formErrors[key] === '') &&
      values.password === values.confirm_password
    ) {
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          console.log(res.data); 
  
          if (res.data.success) {
            navigate('/home');
          } else {
            alert('Signup was not successful.');
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please fix the errors in the form and try again.');
    };
  }
  return (
    <div className='main_container'>
        <div className='form_class_container'>
            <form action='' onSubmit={handleSubmit}>
              <div>
                <label><FontAwesomeIcon className='icon' icon={faUser} /> Name</label>
                <input type="text" name="name" placeholder="Enter your Name" onChange={handleInput} />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
              </div>
              <div>
                <label><FontAwesomeIcon className='icon' icon={faEnvelope} /> Email</label>
                <input type="email" placeholder="Enter your email" name="email" onChange={handleInput} />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
              </div>
              <div>
                <label><FontAwesomeIcon  className='icon' icon={faLock} /> Password</label>
                <input type="password" placeholder="Enter your password" name="password" onChange={handleInput} />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
              </div>
              <div>
                <label><FontAwesomeIcon className='icon' icon={faLock} /> Confirm Password</label>
                <input type="password" placeholder="Enter the password again" name="confirm_password" onChange={handleInput} />
              </div>
              <div>
                <label><FontAwesomeIcon className='icon' icon={faUser} /> Age</label>
                <input type="number" placeholder="Enter your age" name="age" onChange={handleInput} />
              </div>
              <div>
                <label><FontAwesomeIcon className='icon' icon={faCalendar} /> Date of Birth</label>
                <input type="date" placeholder="Enter your DOB" name="dob" onChange={handleInput} />
              </div>
              <div>
                <label>Gender</label>
                <div>
                  <input type="radio" value="Male" id="Male" name="gender" onChange={handleInput} />
                  <label htmlFor="Male"><FontAwesomeIcon className='icon' icon={faMars} /> Male</label>
                </div>
                <div>
                  <input type="radio" value="Female" id="Female" name="gender" onChange={handleInput} />
                  <label htmlFor="Female"><FontAwesomeIcon className='icon' icon={faVenus} /> Female</label>
                </div>
              </div>
              <div>
                <label><FontAwesomeIcon className='icon' icon={faMobileAlt} /> Mobile</label>
                <input type="text" name="mobile" onChange={handleInput} placeholder="Enter your Mobile number" />
              </div>
                <button type='submit' >Sign Up</button>
                <Link to="/login">Already Have an Account??</Link>
            </form>
        </div>
    </div>
  )
}

export default SignUpScreen