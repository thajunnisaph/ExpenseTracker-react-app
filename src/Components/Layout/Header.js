import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Header.module.css';
import { useSelector, useDispatch} from 'react-redux';
import { authActions } from '../../store/authReducer';

function Header() {
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
 
  const dispatch = useDispatch();
  const goToExpenseHandler = () =>{
  
    
    history.push('/expenses')
  }
  const logoutHandler = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    dispatch(authActions.logout());
     history.replace('/login');
  }
  return (
    <div className={classes.header}>
        <h1>Expense Tracker</h1>
  {token &&   <h3 onClick={goToExpenseHandler}>My Expenses</h3>}
        <div className={classes.logout}>
{token && <button onClick={logoutHandler}>Logout</button>}</div>
    </div>
  )
}

export default Header