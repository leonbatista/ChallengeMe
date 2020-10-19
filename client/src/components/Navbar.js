import React from "react";
//Link allows for switching from one route to the other without rendering page
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <div class="nav-wrapper ">
          {/* instead of "href" we need to use "to" when using link */}
          <Link to="/" class="brand-logo left">
            ChallengeMe
          </Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
