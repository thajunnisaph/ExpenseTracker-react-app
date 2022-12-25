import { Fragment } from "react";
import { Route, Switch,Redirect} from "react-router-dom";
import Header from "./Components/Layout/Header";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

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
        <Route path = '/' exact>
          <Redirect to='/login'/>
        </Route>
        </Switch>
        
        </header>
      
    </Fragment>
  );
}

export default App;
