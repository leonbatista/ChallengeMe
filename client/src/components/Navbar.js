import React, { useContext } from "react";
//Link allows for switching from one route to the other without rendering page
//replaces <a> tags-
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/upload">Upload</Link>
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
        <div className="nav-wrapper ">
          {/* instead of "href" we need to use "to" when using link */}
          <Link to={state ? "/" : "/login"} className="brand-logo left">
            ChallengeMe
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
