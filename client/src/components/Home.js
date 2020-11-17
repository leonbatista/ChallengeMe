import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/allposts", {
      headers: { "Authorization":"Bearer "+localStorage.getItem("jwt") }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts.reverse())
      });
  }, []);
  return (
    <div className="home">
      
      {data.map((post) => {
        return (
          <div className="card card-home" key={post._id}>
            <div
              className="home-profile-info"
              style={{
                display: "flex",
                borderBottom: "1px solid #D0D0D0",
                paddingBottom: "10px",
              }}
            >
              <div className="home-profile-pic" style={{ width: "10%" }}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "80px",
                    objectFit: "cover",
                  }}
                  src= "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                  alt=""
                />
              </div>
              <div
                className="home-profile-name"
                style={{ width: "90%", textAlign: "left" }}
              >
                <h5>{post.postedBy.name}</h5>
              </div>
            </div>
            <div className="card-video">
              <video
                src = {post.video}
                controls
              />
            </div>
            <div className="card-content input-field">
              <i className="material-icons">favorite</i>
                <h6>{post.title}</h6>
                <p>{post.body}</p>
              <input type="text" placeholder="Add comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
