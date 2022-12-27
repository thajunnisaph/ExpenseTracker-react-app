import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import ExpenseContext from './ExpenseContext';
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
    async function getExpensefrombackend (){
    const res =await axios.get('https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses.json')
    const data = await res.data;
    console.log(data);
    const temp =[];
    for(const Key in data){
      temp.push({
        id:Key,
        amount:data[Key].amount,
        description:data[Key].description,
        category:data[Key].category
      })
    }
    setExpenses(temp);
   

    }

   

    const expensecontext ={
     expenses:expenses,
     addExpense:addExpenseToContextHandler, 
     getExpense:getExpensefrombackend
     
    }
  return (
    <ExpenseContext.Provider value={expensecontext}>
        {props.children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider