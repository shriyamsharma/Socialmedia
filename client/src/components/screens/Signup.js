import React, {useState, useEffect} from 'react'; 
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);
    useEffect(() => {
        if(url){
            postFields();
        }
    },[url])

    const postDP = () => {
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

    const postFields = () => {
        //check if email is vaild or not
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({html: 'Invalid Email!', classes: 'rounded'});
            return;
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=> res.json())
        .then(data => {
            if(data.error) {
                M.toast({html: data.error, classes: 'rounded'});
            } else {
                M.toast({html: data.message, classes: 'rounded'});
                history.push('/login');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const PostData = () => {

        if(image){
            postDP();
        } else {
            postFields();
        }

    }



    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>SignUp</h2>
                <input 
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn waves-effect waves-light #000000 black">
                        <span>Set DP</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #000000 black" 
                type="submit" 
                name="action"
                onClick={() => PostData()}
                >SignUp</button>
                <h5>
                    <Link className="acc" to="/login">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;