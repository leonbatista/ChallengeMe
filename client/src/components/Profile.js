import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../App"
import image from "../image/defaultProfile.png"


function Profile() {
    const [data,setData] = useState([])
    const [profile,setProfile] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch("/mypost", {
            headers: { "Authorization":"Bearer "+localStorage.getItem("jwt") }
          })
          .then(res => res.json())
          .then(data => {
            setData(data.mypost);
          })
    },[])

  

    return (
        <div style={{maxWidth:"900px", margin:"0px auto"}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px auto",borderBottom:"1px solid grey",padding:"30px 0px"}}>
                <div><img style={{width:"160px",height:"160px",borderRadius:"80px",objectFit:"cover"}} src= {image} alt="" srcSet=""/></div>
                <div>
                    <h4>{state? state.name:"Loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h4>{data.length} Posts</h4>
                        {console.log(state)}
                        <h4>{state.followers?state.followers.length:"0"} Followers</h4>
                        <h4>{state.following?state.following.length:"0"} Following</h4>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {data.map((post)=>{
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
    )
}

export default Profile
