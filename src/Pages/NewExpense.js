import React, { useRef } from 'react';
import classes from './NewExpense.module.css';
import ExpenseContext from '../store/ExpenseContext';
import { useContext } from 'react';

const NewExpense = () => {
    const expensecntx = useContext(ExpenseContext);
    const amountref= useRef();
    const descriptref = useRef();
    const cateref = useRef();
    const addExpenseHandler = (e) =>{
    e.preventDefault();
    const expense = {
        id:Math.random(),
        amount:amountref.current.value,
        description:descriptref.current.value,
        category:cateref.current.value
    }
   expensecntx.addExpense(expense);
   amountref.current.value='';
   descriptref.current.value='';
   cateref.current.value='';
    }
  return (

    <div className={classes.container}>
        <h1>Daily Expenses</h1>
        <form className={classes.form} onSubmit={addExpenseHandler}>
          <label htmlFor='amount'>Money Spent</label> 
          <input type='number' id='amount' required ref={amountref}></input>
          <label htmlFor='description'>Description</label> 
          <input type='text' id='description' required ref={descriptref}></input>
          <label htmlFor='category'>Category</label>
          <select id='category' name='category' ref={cateref}>
            <option value='food'>Food</option>
            <option value='medicine'>Medicine</option>
            <option value='cinema'>Cinema</option>
            <option value='movie'>Movie</option>
            <option value='education'>Education</option>
            <option value='petrol'>Petrol</option>
            <option value='salary'>Salary</option>
          </select>
          <button type='submit'>Add Expense</button>
        </form>
        <div>
            <ul className={classes.expenselist}>{expensecntx.expenses.map((exp) =>{
                return(
                <li key={exp.id} className={classes.expenseitem}>
                    <div> ${exp.amount}</div>
                    <div>{exp.description}</div>
                    <div>{exp.category}</div>
                </li>
                );
            })}</ul>
        </div>
        
    </div>
    
                  
  )
}
export default NewExpense;
