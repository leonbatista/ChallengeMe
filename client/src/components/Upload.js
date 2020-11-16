import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function Upload() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [video, setVideo] = useState("")
    const [previousSource, setPreviousSource] = useState("")
    const [url, setURL] = useState("")
    const history = useHistory()

    const changeFile = (event) => {
      setVideo(event.target.files[0])
      const file = event.target.files[0]
      previewFile(file)
    }

    const previewFile = (file) => {
      const reader  = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setPreviousSource(reader.result)
      }
    }

    const postCloud = () => {
        const data = new FormData()
        data.append("file",video)
        data.append("upload_preset","challengeMe")
        data.append("cloud_name","leonxbatista")
        fetch("	https://api.cloudinary.com/v1_1/leonxbatista/video/upload",{
          method:"post",
          body:data
        })
        .then(res=>res.json())
        .then(data=>{
          setURL(data.url)
        })
        .catch(err => {
          console.log(err);
        })
    }

    useEffect(()=>{ 
      if(url){
      fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        title: title,
        body: body,
        video: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          
        } else {
          console.log("Posted Successful");
          history.push("/")
        }
      })
    }
    },[url,body,history,title])


    return (
        <div className="card input-field" style={{width:"80%"}}>
            <input type="text" placeholder="Title" value={title} onChange={(event)=>{setTitle(event.target.value)}} />
            <input type="text" placeholder="Body" value={body} onChange={(event)=>{setBody(event.target.value)}} />

        <div className="file-field input-field">
            <div style={{backgroundColor:"#43d58c"}} className="btn">
                    <span>Search</span>
                    <input type="file" onChange={changeFile}/>
                </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
             </div>
         </div>
                {previousSource && (<video src={previousSource} alt="" style={{height:"250px",width:"100%"}}/>)}
                 {previousSource && <button className="waves-effect waves-light btn"  style={{ marginTop: "10px" }} onClick={postCloud}>Upload</button>}
        </div>
    )
}

export default Upload
