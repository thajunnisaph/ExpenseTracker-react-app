import React,{useState,useRef}from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
   const [isLogin,setIsLogin] =  useState(false);
   const [isLoading,setIsLoading] = useState(false);
   const history = useHistory();
   const emailref = useRef();
   const pswdref = useRef();
   const cnfmpswd = useRef();
   const switchLoginHandler = () =>{
    setIsLogin((prevState) => !prevState);
   }
   const submitHandler = (event) =>{
    event.preventDefault();
    setIsLoading(true);
    const enteredemail = emailref.current.value;
    const enteredpswd =pswdref.current.value;
   
    let url;
    if(!isLogin  && (enteredpswd === cnfmpswd.current.value)){
     url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCSFqdQN1EWYLkEJ3bEpkLcrhbKfMsKO8';
    }
    else if(!isLogin && (enteredpswd !== cnfmpswd.current.value)){
     alert('password mismatch');
    }
    else{
       
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCSFqdQN1EWYLkEJ3bEpkLcrhbKfMsKO8';
    }
    
    axios.post(url,{
        email:enteredemail,
        password:enteredpswd,
        returnSecureToken:true
    }).then((res) =>{
        setIsLoading(false);
        if(res.status === 200){
        const token = res.data.idToken;
        localStorage.setItem('token',token);
        history.push('/home');
        console.log('User has Succesfully Login');
      console.log(res);}
    }).catch((err) => {
         setIsLoading(false);
        alert(err.response.data.error.message);})

   }
  return (
    <div className={classes.login} >
    <form onSubmit={submitHandler}>
        <h1>{isLogin? 'Login' :'Sign Up'}</h1>
        <div className={classes.control}>
        <input type='email'  placeholder='Email'  ref={emailref} required></input></div>
        <div className={classes.control}>
        <input type='password' placeholder='Password' minLength={6}  ref={pswdref} required></input></div>
        <div className={classes.control}>
        {!isLogin &&(<input type='password' placeholder='Confirm Password'  minLength={6} ref={cnfmpswd} required></input>)}
        </div>
        <div className={classes.actions} >
       {!isLoading  && <button>{isLogin? 'Login':'Sign UP'}</button>}
       {isLoading && <p> Sending Request...</p>}
       {isLogin && <button className={classes.toggle} >Forgot Password</button>}
        <button className={classes.toggle} onClick={switchLoginHandler}>{isLogin? 'Dont have an account?SignUp' : 'Already have an account?Login'}</button>
      
        </div>
    </form>
    </div>
  )
}

export default Login