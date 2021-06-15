import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../App"
import {useParams} from 'react-router-dom'
import image from "../image/defaultProfile.png"


function User() {
    const [data,setData] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()

    useEffect(()=>{
        fetch(`/profile/${userId}`, {
            headers: { "Authorization":"Bearer "+localStorage.getItem("jwt") }
          })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setData(result)
            });
    },[state,userId])

    const handleFollow = () =>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            console.log(data);
        })
    }

    const handleUnfollow = () =>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
          
        })
    }

    return (
        <>
         {data ?  <div style={{maxWidth:"900px", margin:"0px auto"}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px auto",borderBottom:"1px solid grey",padding:"30px 0px"}}>
                <div><img style={{width:"160px",height:"160px",borderRadius:"80px",objectFit:"cover"}} src={data.user.profilePic} alt={image} srcSet=""/></div>
                <div>
                    <h4>{data.user.name}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h4>{data.posts.length} Posts</h4>
                        <h4>{data.user.followers.length} Followers</h4>
                        <h4>{data.user.following.length} Following</h4>
                        {console.log(state)}
                    </div>
                    {data.user.followers.includes(state._id)?<button onClick={handleUnfollow} style={{width:"100%",height:"28px"}}>Unfollow</button>:<button onClick={handleFollow} style={{width:"100%",height:"28px"}}>Follow</button>} 
                </div>
            </div>
            <div className="gallery">
                {data.posts.map((post)=>{
                    return(
                        <video 
                        className="proVideos"
                        src = {post.video}
                        controls
                      />
                    )
                })}
                
         
            </div>
        </div>
         
         : <h2>Loading!</h2>} *
        
        </>
    )
}

export default User
