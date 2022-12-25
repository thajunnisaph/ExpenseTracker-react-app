import React from 'react';
import classes from './Header.module.css';

function Header() {
  return (
    <div className={classes.header}>
        <h1>Expense Tracker</h1>
    </div>
  )
}

export default Header