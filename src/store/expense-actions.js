// import { expenseActions } from "./expenseReducer";
// import axios from "axios";
// async () => {
//     const res = await axios.get(
//          "https://expensetracker-a270d-default-rtdb.firebaseio.com/expenses.json"
//        );
//        const data = await res.data;
//        console.log(data);
//        const temp = [];
//        for (const Key in data) {
//          temp.push({
//            id: Key,
//            amount: data[Key].amount,
//            description: data[Key].description,
//            category: data[Key].category,
//          });
//        }
//    dispatch(expenseActions.getExpense(temp))
//  }