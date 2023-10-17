import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../LoginValidation';
import axios from 'axios';
import '../SignUp/SignupScreenStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
function LoginScreen() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/home')
      .then(res => {
        if (res.data.valid) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]); 

  useEffect(() => {
    if (submitted && errors.email === '' && errors.password === '') {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data.Login) {
            alert("You're redirected to the Home page");
            navigate('/home');
          } else {
            alert('No record exists');
          }
        })
        .catch(err => console.log(err));
    }
  }, [errors, submitted, navigate, values]);

  const handleInput = event => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = event => {
    event.preventDefault();
    setErrors(Validation(values));
    setSubmitted(true);
  };

  return (
    <div className='main_container'>
      <div className='form_class_container'>
        <form action="" onSubmit={handleSubmit}>
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
          <button type="submit">Log in</button>
          <Link to="/">Create an Account??</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
