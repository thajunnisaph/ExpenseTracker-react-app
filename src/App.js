import { Fragment} from "react";
import { Route, Switch,Redirect} from "react-router-dom";
import Header from "./Components/Layout/Header";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import UpdateProfile from "./Pages/UpdateProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import NewExpense from "./Pages/NewExpense";
import { useSelector } from "react-redux";
function App() {

 const isLogin = useSelector(state => state.auth.token);
  
  return (
    <Fragment>
      <header>
        <Header />
        <Switch>
      {!isLogin && <Route  path='/login' exact>
        <Login />
        </Route>}
         {isLogin &&<Route path='/home' exact>
          <Home />
        </Route>}
     {isLogin &&<Route path='/expenses' exact><NewExpense /></Route>}
      {isLogin &&  <Route path= '/profile'>
          <UpdateProfile/></Route>}
          <Route  path='/forgot' exact><ForgotPassword /></Route>
       {!isLogin && <Route path = '/' exact>
          <Redirect to='/login'/>
        </Route>}
      {isLogin && <Route path = '/' exact>
          <Redirect to='/home'/>
        </Route>}
        {isLogin && <Route path='/login' exact><Redirect to='/home'/></Route>}
        </Switch>
        
        </header>
      
    </Fragment>
  );
}

export default App;
