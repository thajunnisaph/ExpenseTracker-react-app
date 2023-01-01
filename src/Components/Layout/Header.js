import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Header.module.css';
import { useSelector, useDispatch} from 'react-redux';
import { authActions } from '../../store/authReducer';

function Header() {
  const history = useHistory();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const goToExpenseHandler = () =>{
    const token = localStorage.getItem('token');
    if(token)
    history.push('/expenses')
  }
  const logoutHandler = () =>{
    localStorage.removeItem('token');
    dispatch(authActions.logout());
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