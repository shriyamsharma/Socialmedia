import React, {useState, useContext} from 'react'; 
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../../App'
import M from 'materialize-css';

const Login = () => {
    const {state, dispatch} = useContext(UserContext); 
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = () => {
        // console.log("clicked")
        console.log(email, password)
        //check if email is vaild or not
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({html: 'Invalid Email!', classes: 'rounded'});
            return;
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.error) {
                M.toast({html: data.error, classes: 'rounded'});
            } else {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({type: "USER", payload: data.user})
                M.toast({html: "SignedIn Successfully", classes: 'rounded'});
                history.push('/');
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Login</h2>
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
                <button className="btn waves-effect waves-light #000000 black" 
                type="submit" 
                name="action"
                onClick={() => PostData()}
                >Login</button>
                <h5>
                    <Link className="acc" to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login;