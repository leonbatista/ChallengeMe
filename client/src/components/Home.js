import React, { useState, useEffect, useContext } from "react";
import {UserContext} from "../App"
import { Link } from "react-router-dom";
import image from "../image/defaultProfile.png"

function Home() {
  const [data, setData] = useState([]);
  const {state,dispatch} = useContext(UserContext)
  
  
  useEffect(() => {
    fetch("/followingPosts", {
      headers: { "Authorization":"Bearer "+localStorage.getItem("jwt") }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts.reverse())

      }).catch(err=>{
        console.log(err);
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
          <div className="card card-home" key={post._id} style={{position:"relative",paddingTop:"10px",paddingBottom:"0"}}>
            {console.log(post.postedBy)}
            <Link to ={ state._id === post.postedBy._id ? "/profile" : `/profile/${post.postedBy._id}`}
              className="home-profile-info"
              style={{
                color:"black",
                display: "flex",
                borderBottom: "1px solid #D0D0D0",
        
              }}
            >
              <div className="home-profile-pic" style={{ width: "10%"}}>
                <img
                  style={{
                    width: "3.6vw",
                    height: "3.6vw",
                    borderRadius: "100%",
                    objectFit: "cover",
                    
                  }}
                  src= {post.postedBy.profilePic?post.postedBy.profilePic:image}
                  alt="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              </div>
              <div style={{flex:"1",position:"relative"}}>
                <p style={{fontSize:"1.2vw", right:"0",textAlign:"left", marginBottom:"16px",fontWeight:"600"}}>{post.postedBy.name}</p>
                <Link to="/">{post.postedBy._id === state._id?<i class=" material-icons" style={{float:"right", fontSize:"150%", paddingRight:"1%",color:"#424242"}} onClick={()=>deletePost(post._id)}>delete_forever</i>:null}</Link>
                </div>
              </Link>
            <div className="card-video">
              <video
                src = {post.video}
                controls
              />
            </div>
            <div className="card-content input-field" style={{marginTop:"0rem"}}>
              <div style={{display:"flex"}}>
              <i className="material-icons" 
                 style={post.likes.includes(state._id)?{color:"red",paddingTop:"10px"}:{color:"black",paddingTop:"10px"}} 
                 onClick={post.likes.includes(state._id)?()=>unlikePost(post._id):()=>likePost(post._id)} 
                 >favorite </i>
                <h6 style={{order:"4",paddingLeft:"0.5%"}}>{post.likes.length} Likes </h6>
                </div>
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <form onSubmit ={(event) => {
                  event.preventDefault()
                  makeComment(event.target[0].value,post._id)
                  event.target[0].value=""
                }}> 
              <input type="text" placeholder="Add comment"  />
                </form>
                {              
                  post.comments.map(item => {
                    return(
                    <h6 key={item._id}><span style={{fontWeight:"500"}}>{item.postedBy.name}</span> {item.text} 
                    {(item.postedBy._id === state._id || post.postedBy._id === state._id) && <i className="material-icons" style={{float:"right"}} onClick={()=>deleteComment(post._id,item._id)}>delete_sweep</i>}
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
