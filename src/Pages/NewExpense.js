import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expenseReducer";
import { themeActions } from "../store/themeReducer";
import classes from "./NewExpense.module.css";
const NewExpense = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [ispremium, setIsPremium] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const email = useSelector((state) => state.auth.email)
  const theme = useSelector((state) => state.theme.isTheme);
  if (theme) {
    document.body.style.background = "darkgreen";
  } else {
    document.body.style.background = " lightblue";
  }
  let totalexpense = 0;
  expenses.forEach((expense) => {
    totalexpense = Number(totalexpense) + Number(expense.amount);
  });

  const amountref = useRef();
  const descriptref = useRef();
  const cateref = useRef();
  async function fetchingdata() {
    const res = await axios.get(
      `https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses${email}.json`
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
    dispatch(expenseActions.getExpense(temp));
  }
  useEffect(() => {
    fetchingdata();
  }, []);

  const addExpenseHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses${email}.json`,
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
        dispatch(expenseActions.addExpense(expense));

        amountref.current.value = "";
        descriptref.current.value = "";
        cateref.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteHandler = (id) => {
    axios.delete(
      `https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses${email}/${id}.json`
    );
    dispatch(expenseActions.deleteExpense(id));
  };
  const editHandler = (exp) => {
    setIsEdit(true);
    amountref.current.value = exp.amount;
    descriptref.current.value = exp.description;
    cateref.current.value = exp.category;
  };
  const updateHandler = async (exp) => {
    setIsEdit(false);
    await axios.put(
      `https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses${email}/${exp.id}.json`,
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
    dispatch(expenseActions.updateExpense(data));
    amountref.current.value = "";
    descriptref.current.value = "";
    cateref.current.value = "";
  };
  const activatePremiumHandler = () => {
    setIsPremium(true);
    dispatch(themeActions.toggle());
  };
  const toggleHandler = () => {
    dispatch(themeActions.toggle());
  };
  function makeCSV(expenses) {
    if (expenses.length > 0) {
      const headers = Object.keys(expenses[0]).toString();
      const main = expenses.map((exp) => {
        return Object.values(exp).toString();
      });
      const csv = [headers, ...main].join("\n");
      return csv;
    }
  }
  const blob = new Blob([makeCSV(expenses)]);
  const url = URL.createObjectURL(blob);
  return (
    <div className={classes.container}>
      {totalexpense > 10000 && (
        <div className={classes.premium}>
          <button onClick={activatePremiumHandler}>Activate Premium!</button>
          {ispremium && (
            <>
              <button onClick={toggleHandler}>
                {theme ? "Switch To Light " : "Switch To Dark"}
              </button>
              <a download="expense.csv" href={url}>
                Download
              </a>
            </>
          )}
        </div>
      )}
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
        {!isEdit && <button type="submit">Add Expense</button>}
      </form>
      <ul className={classes.expenselist}>
        {expenses.map((exp) => {
          return (
            <li key={exp.id} className={classes.expenseitem}>
              <div> ${exp.amount}</div>
              <div>{exp.description}</div>
              <div>{exp.category}</div>
              <div className={classes.action}>
                <button onClick={() => deleteHandler(exp.id)}>Delete</button>
                <button onClick={() => editHandler(exp)}>Edit</button>
                {isEdit && (
                  <button onClick={() => updateHandler(exp)}>Update</button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className={classes.total}>Total Expense: ${totalexpense}</div>
    </div>
  );
};

export default NewExpense;
