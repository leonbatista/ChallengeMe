import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="card-div" style={{ padding: "120px" }}>
      <div className="card input-field">
        <h2>Challenge Me</h2>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <a
          href="/"
          className="waves-effect waves-light btn"
          style={{ marginTop: "10px" }}
        >
          Sign Up
        </a>
      </div>
      <div className="card input-field">
        <h1 style={{ fontSize: "1.2rem", margin: "0" }}>
          Already have an account? <Link to="/login">Log In </Link>{" "}
        </h1>
      </div>
    </div>
  );
}

export default Signup;
