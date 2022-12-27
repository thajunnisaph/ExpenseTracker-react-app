import axios from "axios";
import React from "react";
import { useEffect, useRef } from "react";
import { useContext } from "react";

import ExpenseContext from "../store/ExpenseContext";
import classes from "./NewExpense.module.css";
const NewExpense = () => {
  const expensectx = useContext(ExpenseContext);
  const amountref = useRef();
  const descriptref = useRef();
  const cateref = useRef();

  useEffect(() => {
    expensectx.getExpense();
  }, []);

  const addExpenseHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses.json",
        {
          amount: amountref.current.value,
          description: descriptref.current.value,
          category: cateref.current.value,
        }
      )
      .then((res) => {
        console.log(res.data.name);
        const expense = {
          id: res.data.name,
          amount: amountref.current.value,
          description: descriptref.current.value,
          category: cateref.current.value,
        };
        expensectx.addExpense(expense);

        amountref.current.value = "";
        descriptref.current.value = "";
        cateref.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteHandler = (id) => {
    expensectx.deleteExpense(id);
  };
  const editHandler = (exp) => {
    amountref.current.value = exp.amount;
    descriptref.current.value = exp.description;
    cateref.current.value = exp.category;
  };
  const updateHandler = async (exp) => {
    await axios.put(
      `https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses/${exp.id}.json`,
      {
        amount: amountref.current.value,
        description: descriptref.current.value,
        category: cateref.current.value,
      }
    );
    let data = {
      id: exp.id,
      amount: amountref.current.value,
      description: descriptref.current.value,
      category: cateref.current.value,
    };
    expensectx.updateExpense(data);
    amountref.current.value = "";
    descriptref.current.value = "";
    cateref.current.value = "";
  };

  return (
    <div className={classes.container}>
      <h1>Daily Expenses</h1>
      <form className={classes.form} onSubmit={addExpenseHandler}>
        <label htmlFor="amount">Money Spent</label>
        <input type="number" id="amount" required ref={amountref}></input>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" required ref={descriptref}></input>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" ref={cateref}>
          <option value="food">Food</option>
          <option value="medicine">Medicine</option>
          <option value="cinema">Cinema</option>
          <option value="movie">Movie</option>
          <option value="education">Education</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <ul className={classes.expenselist}>
        {expensectx.expenses.map((exp) => {
          return (
            <li key={exp.id} className={classes.expenseitem}>
              <div> ${exp.amount}</div>
              <div>{exp.description}</div>
              <div>{exp.category}</div>
              <div className={classes.action}>
                <button onClick={() => deleteHandler(exp.id)}>Delete</button>
                <button onClick={() => editHandler(exp)}>Edit</button>
                <button onClick={() => updateHandler(exp)}>Update</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewExpense;
