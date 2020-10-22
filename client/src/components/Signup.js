import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState({ error: "", display: null });

  const SignUp = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setSignUpError({ error: data.error, display: true });
        } else {
          setSignUpError({ display: false });
        }
      });
  };

  return (
    <div className="card-div" style={{ padding: "120px" }}>
      <div className="card input-field">
        <h2>Challenge Me</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          className="waves-effect waves-light btn"
          style={{ marginTop: "10px" }}
          onClick={() => SignUp()}
        >
          Sign Up
        </button>
        {/* Display whether the user sign up failed or succeded */}
        {(() => {
          switch (signUpError.display) {
            case true:
              return (
                <p style={{ paddingTop: "18px", color: "red" }}>
                  {signUpError.error}
                </p>
              );
            case false:
              return <p>You haved successfuly signed up</p>;

            default:
              return;
          }
        })()}
      </div>
      <div className="card input-field">
        <h1 style={{ fontSize: "1.2rem", margin: "0" }}>
          Already have an account? <Link to="/login">Log In </Link>
        </h1>
      </div>
    </div>
  );
}

export default Signup;
