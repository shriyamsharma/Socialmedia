import React, {useEffect, useState, useContext} from 'react'; 
import {UserContext} from '../../App';

const Profile = () => {
    const [mypics, setPics] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    const [image, setImage] = useState("");
    // const [url, setUrl] = useState(undefined);
    useEffect(() => {
        fetch('/mypost', {
            headers:{
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            setPics(result.mypost)
        })
    }, [])

    useEffect(() => {
        if(image){
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "socialMedia");    
            data.append("cloud_name","dpiq0zpxp");
            fetch("https://api.cloudinary.com/v1_1/dpiq0zpxp/image/upload", {
                method: "post",
                body:data
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // setUrl(data.url);
                // localStorage.setItem("user", JSON.stringify({...state, pic:data.url}))
                // dispatch({type:"UPDATEPIC", payload:data.url})
                fetch('/updatepic', {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic: data.url
                    })
                }).then(res => res.json())
                .then(result=> {
                    console.log(result)
                    localStorage.setItem("user", JSON.stringify({...state, pic:result.pic}))
                    dispatch({type:"UPDATEPIC", payload:result.pic})
                })
                // window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [image])

    const postDP = (file) => {
        setImage(file);
    }

    return(
        <div style={{maxWidth: "75%", margin: "0px auto"}}>
            <div style={{
                margin:"18px 0px",
                borderBottom: "1px solid black"
            }}>
                <div style={{
                display:"flex",
                justifyContent:"space-around",
                }}>
                    <div>
                        <img style={{width: "160px", height:"160px", borderRadius:"80px"}}
                        src={state?state.pic:"loading"}
                        alt=""/>
                    </div>
                    <div>
                        <h4>{state?state.name:"loading"}</h4>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h5>{mypics.length} post</h5>
                            <h5>{state?state.followers.length:"0"} followers</h5>
                            <h5>{state?state.following.length:"0"} following</h5>
                        </div>
                    </div>
                </div>

                <div className="file-field input-field" style={{margin:"5px 0px 50px 105px"}}>
                    <div className="btn waves-effect waves-light #000000 black">
                        <span>Set DP</span>
                        <input type="file" onChange={(e) => postDP(e.target.files[0])}/>
                    </div>
                </div>
            </div>   
            <div className="gallery">
                {
                    mypics.map(item => {
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
          </div>
        </div>
    )
}

export default Profile;

