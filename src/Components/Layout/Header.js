import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
  const history = useHistory();
  const goToExpenseHandler = () =>{
    const token = localStorage.getItem('token');
    if(token)
    history.push('/expenses')
  }
  const logoutHandler = () =>{
    localStorage.removeItem('token');
     history.replace('/login');
  }
  return (
    <div className={classes.header}>
        <h1>Expense Tracker</h1>
        <h3 onClick={goToExpenseHandler}>My Expenses</h3>
        <div className={classes.logout}>
        <button onClick={logoutHandler}>Logout</button></div>
    </div>
  )
}

export default Header