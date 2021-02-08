import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../App"
import {useParams} from 'react-router-dom'

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
                setData(result)
            });
    },[])

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
            console.log(data);
        })
    }

    const handleUnFollow = () =>{
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
            console.log(data);
        })
    }

    return (
        <>
         {data ?  <div style={{maxWidth:"900px", margin:"0px auto"}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px auto",borderBottom:"1px solid grey",padding:"30px 0px"}}>
                <div><img style={{width:"160px",height:"160px",borderRadius:"80px",objectFit:"cover"}} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" srcSet=""/></div>
                <div>
                    <h4>{data.user.name}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h4>{data.posts.length} Posts</h4>
                        <h4>{data.user.followers.length} Followers</h4>
                        <h4>{data.user.following.length} Following</h4>
                        {console.log(state)}
                    </div>
                     <button onClick={handleFollow} style={{width:"100%",height:"28px"}}>Follow User</button>
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