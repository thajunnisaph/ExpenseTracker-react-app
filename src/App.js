import { Fragment } from "react";
import Header from "./Components/Layout/Header";
import Login from "./Pages/Login";

function App() {
  return (
    <Fragment>
      <header>
        <Header />
        <Login />
        </header>
      
    </Fragment>
  );
}

export default App;
