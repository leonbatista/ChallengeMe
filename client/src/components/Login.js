import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
function Login() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logInError, setLogInError] = useState({ error: "", display: null });

  const LogIn = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setLogInError({ error: data.error, display: true });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          setLogInError({ display: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card-div" style={{ padding: "120px" }}>
      <div className="card input-field">
        <h2>Challenge Me</h2>
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
            setPassword(event.target.value)
          }}
         onKeyPress={(event)=>{
            if(event.key === "Enter"){  
              LogIn()
            }
          }}
        />
        
        <button
          className="waves-effect waves-light btn"
          style={{ marginTop: "10px" }}
          onClick={() => LogIn()}
         
        >
          Log In
        </button>
        {/* Display whether the user sign up failed or succeded */}
        {(() => {
          switch (logInError.display) {
            case true:
              return (
                <p style={{ paddingTop: "18px", color: "red" }}>
                  {logInError.error}
                </p>
              );
            case false:
              return history.push("/");
            default:
              return;
          }
        })()}
      </div>
      <div className="card input-field">
        <h1 style={{ fontSize: "1.2rem", margin: "0" }}>
          Don't have an account? <Link to="/signup">Sign Up </Link>{" "}
        </h1>
      </div>
    </div>
  );
}

export default Login;
