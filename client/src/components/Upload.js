import React,{useState} from 'react'

function Upload() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [video, setVideo] = useState("")
    const [previousSource, setPreviousSource] = useState("")

    const changeFile = (event) => {
      setVideo(event.target.files[0])
      previewFile(event.target.files[0])
    }

    const previewFile = (file) => {
      const reader  = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setPreviousSource(reader.result)
      }
    }

    const uploadPost = () => {
        fetch("/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            video: video,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
            if (data.error) {
              
            } else {
              
            }
          });
      };


    return (
        <div className="card input-field">
            <input type="text" placeholder="Title" value={title} onChange={(event)=>{setTitle(event.target.value)}} />
            <input type="text" placeholder="Body" value={body} onChange={(event)=>{setBody(event.target.value)}} />

        <div className="file-field input-field">

                <div style={{backgroundColor:"#43d58c"}} className="btn">
                    <span>Search</span>
                    <input type="file" onChange={changeFile}/>
                </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" value={video.name}  />
             </div>
         </div>
                {previousSource && (<video src={previousSource} alt="" style={{height:"250px",width:"100%"}}/>)}
                 <button className="waves-effect waves-light btn"  style={{ marginTop: "10px" }} onClick={uploadPost}>Upload</button>
        </div>
    )
}

export default Upload
