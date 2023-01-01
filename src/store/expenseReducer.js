import { createSlice } from '@reduxjs/toolkit';
const expenseinitialstate = {expenses:[],totalexpense:0}
const expenseSlice = createSlice({
    name:'expense',
    initialState:expenseinitialstate,
    reducers:{
    addExpense(state,action){
    state.expenses = [...state.expenses,action.payload];
    state.totalexpense = Number(state.totalexpense)+Number(action.payload.amount);
    },
    getExpense(state,action){
        state.expenses = action.payload
     
    },
    deleteExpense(state,action){
    const id= action.payload;
    let expenselist = [...state.expenses];
    expenselist.forEach((expense, index) => {
      if (expense.id === id) {
        state.totalexpense = Number(state.totalexpense-expense.amount);
        expenselist.splice(index, 1);
      }
    });
    state.expenses = expenselist
    },
    updateExpense(state,action){
        const data = action.payload;
    const newexpenses= [...state.expenses]
    newexpenses.forEach((expense) =>{
        if(expense.id === data.id){
         expense.amount = data.amount
         expense.description = data.description
         expense.category = data.category
        }
    })
    state.expenses = newexpenses

    }
    

    }
})
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;