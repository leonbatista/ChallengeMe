import React, { useState, useContext } from "react";
//Link allows for switching from one route to the other without rendering page
//replaces <a> tags-
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState()
  const [usersFound, setUsersFound] = useState()
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li style={{ float: "right" }}><Link onClick={() => {
          resetSearch()
          localStorage.clear()
          dispatch({ type: "LOGOUT" })
          history.push("/login")
        }}>Log Out</Link></li>,
        <li style={{ float: "right" }}>
          <Link onClick={() => resetSearch()} to="/upload" >Upload</Link>
        </li>,
        <li style={{ float: "right" }}>
          <Link onClick={() => resetSearch()} to="/profile">Profile</Link>
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

  const findUser = (query) => {
    setSearch(query)
    if (query) {
      fetch("/findUser", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      }).then(res => res.json())
        .then(data => {
          const newData = [...data.user]
          setUsersFound(newData)
        })
    } else
      setUsersFound(null)
  }

  const resetSearch = () => {
    setSearch("")
    setUsersFound(null)
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          {/* instead of "href" we need to use "to" when using link */}
          <Link onClick={() => resetSearch()} to={state ? "/" : "/login"} style={{ flex: "1", fontSize: "2.1rem", justifyContent: "center" }}>
            ChallengeMe
          </Link>
          {state ? <div className="search-bar">
            <input type="text" placeholder="Search" className="search-text" value={search}
              onChange={(event) => {
                findUser(event.target.value)
              }}
              style={{ color: "#fff", border: "solid 3px #38b174", backgroundColor: "#38b174", borderRadius: "50px", paddingLeft: "5%", paddingRight: "5%" }} />
          </div> : null}
          <ul id="nav-mobile" style={{ flex: "1" }}>
            {renderList()}
          </ul>
        </div>
      </nav>
      <ul className="search-users-list" >
        {usersFound ? usersFound.map(user => {
          return (
            <Link onClick={() => resetSearch()} to={"/profile/" + user._id}><li style={{ color: "black", fontWeight: "600", display: "flex", paddingBottom: "2px" }}> <img src={user.profilePic} alt="" style={{
              width: "2.6vw",
              height: "2.6vw",
              borderRadius: "80px",
              objectFit: "cover",
              marginLeft: "8px",
              marginTop: "8px",


            }} />
              <p style={{ fontSize: "1vw", marginBottom: "5px", marginTop: "18px", marginLeft: "10px" }} >{user.name}</p></li></Link>
          )
        }) : null}
      </ul>
    </div>
  );
}

export default Navbar;
