import React from "react";
import {Link} from "react-router-dom"

function Login() {
  return (
    <div className="card-div" style={{padding:"120px"}}>
      <div className="card input-field">
        <h2>Challenge Me</h2>
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Password"/>
        <a href="/signin" className="waves-effect waves-light btn"  style={{ marginTop: "10px" }}>Log In</a>
      </div>
      <div className="card input-field">
        <h1 style={{fontSize:"1.2rem",margin:"0"}}>Don't have an account? <Link to="/signup">Sign Up </Link> </h1>
      </div>
    </div>
  );
}

export default Login;
