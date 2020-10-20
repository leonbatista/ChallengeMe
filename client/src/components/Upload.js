import React from 'react'

function Upload() {
    return (
        <div className="card input-field">
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Body"/>
            <div className="file-field input-field">
             <div style={{backgroundColor:"#43d58c"}} className="btn">
             <span>Search</span>
                 <input type="file"/>
         </div>
         <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
          </div>
         </div>
         <a href="/signin" className="waves-effect waves-light btn"  style={{ marginTop: "10px" }}>Upload</a>
        </div>
    )
}

export default Upload
