import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
  const history = useHistory();
  const logoutHandler = () =>{
    localStorage.removeItem('token');
     history.replace('/login');
  }
  return (
    <div className={classes.header}>
        <h1>Expense Tracker</h1>
        <div className={classes.logout}>
        <button onClick={logoutHandler}>Logout</button></div>
    </div>
  )
}

export default Header