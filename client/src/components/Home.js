import React from "react";

function Home() {
  return <div className="home">
      <div className="card card-home">
          <div className="home-profile-info" style={{display:"flex",borderBottom:"1px solid #D0D0D0",paddingBottom:"10px"}}>
            <div className="home-profile-pic" style={{width:"10%"}}>
                <img style={{width:"50px",height:"50px",borderRadius:"80px",objectFit:"cover"}} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt=""/>
            </div>
            <div className="home-profile-name" style={{width:"90%",textAlign:"left"}}>
              <h5>Username</h5>
          </div>
          </div>
          <div className="card-image">
              <img  src="https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt=""/>
          </div>
          <div className="card-content input-field">
                <i className="material-icons" >favorite</i>
                <h6>title</h6>
                <p>This is a comment for the post</p>
                <input type="text" placeholder="Add comment"/>
          </div>
      </div>
      
  </div>;
}

export default Home;
