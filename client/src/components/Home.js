import React, { useState, useEffect, useContext } from "react";
import {UserContext} from "../App"

function Home() {
  const [data, setData] = useState([]);
  const {state,dispatch} = useContext(UserContext)
  
  
  useEffect(() => {
    fetch("/allposts", {
      headers: { "Authorization":"Bearer "+localStorage.getItem("jwt") }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts.reverse())
        
      });
  }, []);

  const likePost = (id) =>{
    fetch("/like",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
      }).then(res=>res.json())
      .then(result => {
        const newData = data.map(item =>{
          if(item._id === result._id){
            return result
          }
          else{
            return item
          }
        })
        setData(newData)
    }).catch(err=>{
      console.log(err);
    })
  }

  const unlikePost = (id) =>{
   
    fetch("/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result => {
      const newData = data.map(item =>{
        if(item._id === result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
  }).catch(err=>{
    console.log(err);
  })
  }

  const makeComment = (text,postId) => {
    fetch("/comment",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:postId,
        text:text
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      const newData = data.map(item =>{
        if(item._id === result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
  }).catch(err=>{
    console.log(err);
  })
  }

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      const newData = data.filter(item => {
        return item._id !== result._id
      })
      setData(newData)
    })
  }

  const deleteComment = (postId,commentId) => {
    fetch("/deletecomment",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:postId,
        commentId: commentId
      })
      }).then(res=>res.json())
      .then(result => {
        const newData = data.map(item =>{
          if(item._id === result._id){
            return result
          }
          else{
            return item
          }
        })
        setData(newData)
    }).catch(err=>{
      console.log(err);
    })
  }

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
                <h5>{post.postedBy.name} 
                {post.postedBy._id === state._id?<button style={{float:"right"}} onClick={()=>deletePost(post._id)}>DELETE</button>:null}</h5>
              </div>
            </div>
            <div className="card-video">
              <video
                src = {post.video}
                controls
              />
            </div>
            <div className="card-content input-field">
              <i className="material-icons" 
                 style={post.likes.includes(state._id)?{color:"red"}:{color:"black"}} 
                 onClick={post.likes.includes(state._id)?()=>unlikePost(post._id):()=>likePost(post._id)} 
                 >favorite</i>
                <h6>{post.likes.length} Likes </h6>
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <form onSubmit ={(event) => {
                  event.preventDefault()
                  makeComment(event.target[0].value,post._id)
                  
                }}> 
              <input type="text" placeholder="Add comment"  />
                </form>
                {              
                  post.comments.map(item => {
                    return(
                    <h6 key={item._id}><span style={{fontWeight:"500"}}>{item.postedBy.name}</span> {item.text} 
                    {(item.postedBy._id === state._id || post.postedBy._id === state._id) && <button style={{float:"right"}} onClick={()=>deleteComment(post._id,item._id)}>DELETE</button>}
                    </h6>
                    )
                  })
                }
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
