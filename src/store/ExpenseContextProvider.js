import React from "react";
import axios from "axios";
import { useState } from "react";
import ExpenseContext from "./ExpenseContext";
const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const addExpenseToContextHandler = (expense) => {
    console.log(expense);
    setExpenses((prev) => {
      return [...prev, expense];
    });
  };
  async function getExpensefrombackend() {
    const res = await axios.get(
      "https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses.json"
    );
    const data = await res.data;
    console.log(data);
    const temp = [];
    for (const Key in data) {
      temp.push({
        id: Key,
        amount: data[Key].amount,
        description: data[Key].description,
        category: data[Key].category,
      });
    }
    setExpenses(temp);
  }
  const deleteExpenseHandler = (id) => {
    axios.delete(
      `https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses/${id}.json`
    );

    let expenselist = [...expenses];
    expenselist.forEach((expense, index) => {
      if (expense.id === id) {
        expenselist.splice(index, 1);
      }
    });
    setExpenses(expenselist);
    console.log("successfully deleted");
  };
  const updateExpenseHandler = (expense) => {
    const expenselist = [...expenses];
    expenselist.forEach((exp, index) => {
      if (exp.id === expense.id) {
        expenselist.splice(index, 1);
      }
    });
    setExpenses([...expenselist, expense]);
  };

  const expensecontext = {
    expenses: expenses,
    addExpense: addExpenseToContextHandler,
    getExpense: getExpensefrombackend,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expensecontext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
