import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom';
import classes from './Home.module.css';
function Home() {
    const history = useHistory();
    const verifyEmailHandler = () =>{
        const token = localStorage.getItem('token');
     axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCCSFqdQN1EWYLkEJ3bEpkLcrhbKfMsKO8',{
        requestType:"VERIFY_EMAIL",
        idToken:token
     }).then((res) =>{
        console.log(res);
        console.log('Please check inbox to verify the email');
     }).catch((err) =>{
        alert('Failed to send verification link,please try again');
        console.log(err);
     })
    }
  const profileUpdateHandler = () =>{
  history.push('/profile');
  }
  return (
    <>
    <div className={classes.verify}> <button onClick={verifyEmailHandler}>Verify Your Email</button></div>
    <div className={classes.home}>
        <h1>Welcome To Expense Tracker</h1>
        <h3>Your profile is incomplete.<button onClick={profileUpdateHandler}><h3>Complete now</h3></button></h3>
         
    </div>
    </>
  )
}

export default Home