import React from 'react';
const ExpenseContext = React.createContext({
expenses:[],
addExpense:(expense) =>{},
getExpense:() =>{}
});
export default ExpenseContext;