import React from 'react'
import { useState } from 'react'
import ExpenseContext from './ExpenseContext'
const ExpenseContextProvider = (props) => {
    const [expenses,setExpenses] = useState([]);
    const addExpenseToContextHandler = (expense) =>{
        console.log(expense)
     setExpenses((prev) =>{
        return(
            [...prev,expense]
        )
     })
    }
    const expensecontext ={
     expenses:expenses,
     addExpense:addExpenseToContextHandler,  
    }
  return (
    <ExpenseContext.Provider value={expensecontext}>
        {props.children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider