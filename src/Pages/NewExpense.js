
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import ExpenseForm from '../Components/Expense/ExpenseForm';
import ExpenseContext from '../store/ExpenseContext';
import classes from './NewExpense.module.css';
const NewExpense = () => {
  const expensectx=useContext(ExpenseContext);
 useEffect(() =>{
  expensectx.getExpense();
 },[])
  return (
    <div className={classes.container}>
      <ExpenseForm />
    <ul className={classes.expenselist}>{expensectx.expenses.map((exp) =>{
        return(
        <li key={exp.id} className={classes.expenseitem}>
            <div> ${exp.amount}</div>
            <div>{exp.description}</div>
            <div>{exp.category}</div>
        </li>
        );
    })}</ul>
</div>
  )
}

export default NewExpense;