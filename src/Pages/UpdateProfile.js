import axios from "axios";
import React, { useRef } from "react";
import classes from "./UpdateProfile.module.css";

function UpdateProfile() {
  const nameref = useRef();
  const urlref = useRef();
  async function updateHandler (e)  {
    e.preventDefault();
    const name = nameref.current.value;
    const url = urlref.current.value;
    const response =await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCSFqdQN1EWYLkEJ3bEpkLcrhbKfMsKO8",
      {
        idToken: localStorage.getItem("token"),
        displayName: name,
        photoUrl: url,
        returnSecureToken: true,
      }
    );
    console.log(response);
  };
  return (
    <div className={classes.profile}>
      <div className={classes.heading}>
        <h2>Contact Details</h2>
        <div>
          <button>Cancel</button>
        </div>
      </div>
      <div className={classes.input}>
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" ref={nameref} />
        <label htmlFor="url">Profile Photo URL:</label>
        <input type="text" id="url" ref={urlref} />
      </div>
      <div>
        <button className={classes.update} onClick={updateHandler}>
          Update
        </button>
      </div>
      <hr />
    </div>
  );
}

export default UpdateProfile;
