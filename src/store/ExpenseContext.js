import React from 'react';
const ExpenseContext = React.createContext({
expenses:[],
addExpense:(expense) =>{},
getExpense:() =>{},
deleteExpense:(id) =>{},
updateExpense:(expense) =>{},
});
export default ExpenseContext;