import { Fragment } from "react";
import { Route, Switch,Redirect} from "react-router-dom";
import Header from "./Components/Layout/Header";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import UpdateProfile from "./Pages/UpdateProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import NewExpense from "./Pages/NewExpense";

function App() {
  return (
    <Fragment>
      <header>
        <Header />
        <Switch>
        <Route  path='/login'>
        <Login />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/expenses'><NewExpense /></Route>
        <Route path= '/profile'>
          <UpdateProfile/></Route>
          <Route  path='/forgot'><ForgotPassword /></Route>
        <Route path = '/' exact>
          <Redirect to='/login'/>
        </Route>
        </Switch>
        
        </header>
      
    </Fragment>
  );
}

export default App;
