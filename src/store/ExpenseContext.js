import React from 'react';
const ExpenseContext = React.createContext({
expenses:[],
addExpense:(expense) =>{},
});
export default ExpenseContext;