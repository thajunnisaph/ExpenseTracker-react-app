import React from 'react'
import { useHistory } from 'react-router-dom';
import classes from './Home.module.css';
function Home() {
    const history = useHistory();
  const profileUpdateHandler = () =>{
  history.push('/profile');
  }
  return (
    <div className={classes.home}>
        <h1>Welcome To Expense Tracker</h1>
        <h3>Your profile is incomplete.<button onClick={profileUpdateHandler}><h3>Complete now</h3></button></h3>
    </div>
  )
}

export default Home