import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* exact excludes the other paths from seen this one */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
    </BrowserRouter>
  );
}

export default App;
