import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import classes from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const history = useHistory();
    const emailref   = useRef();
    const [isLoading,setIsLoading] = useState(false);
    const loginHandler = () =>{
        history.replace('/login');
    }
    const submitHandler = (e) =>{
     e.preventDefault();
     setIsLoading(true);
     const email = emailref.current.value;
     axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCCSFqdQN1EWYLkEJ3bEpkLcrhbKfMsKO8',{
      requestType:"PASSWORD_RESET",
      email:email
     }).then((res) =>{
      setIsLoading(false);
      console.log(res.data);
      alert('please check your registered mail for reset password link');
     }).catch((err) =>{
      console.log(err.message);
      alert('Enter valid email');
     })
    }
  return (
    <div className={classes.container}>
        <form className={classes.form} onSubmit={submitHandler}>
            <p>Enter the email with which you have registered.</p>
            <input type='email' placeholder='Email' ref={emailref} required></input>
            <button type='submit'>Send Link</button>
         {isLoading && <p>Loading...</p>}
            <p>Already a user?<span onClick={loginHandler}>Login</span></p>
        </form>
    </div>
  )
}

export default ForgotPassword