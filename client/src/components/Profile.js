import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../App"


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
                <div><img style={{width:"160px",height:"160px",borderRadius:"80px",objectFit:"cover"}} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" srcSet=""/></div>
                <div>
                    <h4>{state? state.name:"Loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h4>{data.length} Posts</h4>
                        {console.log(state)}
                        <h4>0 Followers</h4>
                        <h4>0 Following</h4>
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
