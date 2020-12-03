import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';    

const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if(url) {
                    //post to server
        fetch("/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic: url
            })
        }).then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.error) {
                M.toast({html: data.error, classes: 'rounded'});
            } else {
                M.toast({html: "Created Post Successfully", classes: 'rounded'});
                history.push('/');
            }
        }).catch(err => {
            console.log(err);
        })
        }
    }, [url]);


    const postDetails = () => {
        //image upload to cloudinary
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
            setUrl(data.url);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="card input-field create">
            <input 
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="body"            
            value={body}
            onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn waves-effect waves-light #000000 black">
                    <span>Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button 
            className="btn waves-effect waves-light #000000 black" 
            type="submit" 
            name="action"
            onClick={() => postDetails()}>Post</button>
        </div>
    )
}

export default CreatePost;