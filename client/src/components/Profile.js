import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../App"
import image from "../image/defaultProfile.png"


function Profile() {
    const [data, setData] = useState([])
    const [profile, setProfile] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [profilePic, setProfilePic] = useState()
    const [url, setURL] = useState("")

    useEffect(() => {
        
        fetch("/mypost", {
            headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") }
        })
            .then(res => res.json())
            .then(data => {
                setData(data.mypost);
            })

    }, [])

    useEffect(() => {
        fetch("/profilePic", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                userId: state._id
            })
        }).then(res => res.json())
            .then(data => {
                setProfile(data)
            })
    }, [state._id])

    const changeProfilePic = () => {
        fetch("/changeProfilePic", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                profilePic: url,
                userId: state._id
            })
        }).then(res => res.json())
            .then(data => {
                setProfile(data)
            })

    }



    const postCloud = () => {
        const data = new FormData()
        data.append("file", profilePic)
        data.append("upload_preset", "challengeMe")
        data.append("cloud_name", "leonxbatista")
        fetch("	https://api.cloudinary.com/v1_1/leonxbatista/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setURL(data.url)
            })
            .catch(err => {
                console.log(err);
            })
    }



    return (
        <div style={{ maxWidth: "900px", margin: "0px auto" }}>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px auto", borderBottom: "1px solid grey", padding: "30px 0px" }}>
                <div><img style={{ width: "160px", height: "160px", borderRadius: "80px", objectFit: "cover" }} src={profile.profilePic ? profile.profilePic : image} alt="" srcSet="" /></div>
                <div>
                    <h4>{state ? state.name : "Loading"}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h4>{data.length} Posts</h4>
                        {console.log(state)}
                        <h4>{state.followers ? state.followers.length : "0"} Followers</h4>
                        <h4>{state.following ? state.following.length : "0"} Following</h4>
                    </div>
                    <div>
                        <input type="file" onChange={(event) => { setProfilePic(event.target.files[0]) }} />
                        <button onClick={postCloud}> Submit </button>
                        <button onClick={changeProfilePic}>Change Picture</button>
                    </div>

                </div>
            </div>
            <div className="gallery">
                {data.map((post) => {
                    return (
                        <video
                            className="proVideos"
                            src={post.video}
                            controls
                        />
                    )
                })}


            </div>
        </div>
    )
}

export default Profile
