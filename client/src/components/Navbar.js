import React, { useContext } from "react";
//Link allows for switching from one route to the other without rendering page
//replaces <a> tags-
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li style={{ float: "right" }}><Link onClick={() => {
          localStorage.clear()
          dispatch({ type: "LOGOUT" })
          history.push("/login")
        }}>Log Out</Link></li>,
        <li style={{ float: "right" }}>
          <Link to="/upload">Upload</Link>
        </li>,
        <li style={{ float: "right" }}>
          <Link to="/profile">Profile</Link>
        </li>,

      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          {/* instead of "href" we need to use "to" when using link */}
          <Link to={state ? "/" : "/login"} style={{ flex: "1", fontSize: "2.1rem", justifyContent: "center" }}>
            ChallengeMe
          </Link>
          <div className="search-bar">
            <input type="text" placeholder="Search" className="search-text" style={{ color: "#fff", border: "solid 3px #38b174", backgroundColor: "#38b174", borderRadius: "50px", paddingLeft: "5%", paddingRight: "5%", }} />
          </div>
          <ul id="nav-mobile" style={{ flex: "1" }}>
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
