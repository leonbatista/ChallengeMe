import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Router, useHistory } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import User from "./components/User"
import { reducer, initialState } from "./reducers/userReducer";

//Passing information through states
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(
    () => {
      //Get user from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({ type: "USER", payload: user });
      } else {
        history.push("/login");
      }
    },
    //Might cause error later on DOUBLE CHECK
    [dispatch, history]
  );
  return (
    <div>
      {/* exact excludes the other paths from seen this one */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route  path="/login">
        <Login />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Route path="/profile/:userId">
        <User />
      </Route>
    </div>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    //Passing information through states
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
