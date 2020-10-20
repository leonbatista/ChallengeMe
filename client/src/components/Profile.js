import React from 'react'

function Profile() {
    return (
        <div style={{maxWidth:"900px", margin:"0px auto"}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px auto",borderBottom:"1px solid grey",padding:"30px 0px"}}>
                <div><img style={{width:"160px",height:"160px",borderRadius:"80px",objectFit:"cover"}} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" srcSet=""/></div>
                <div>
                    <h4>Profile Stats</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h4>0 Posts</h4>
                        <h4>0 Followers</h4>
                        <h4>0 Following</h4>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
                <img className="proImages" src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" srcSet=""/>
            </div>
        </div>
    )
}

export default Profile
