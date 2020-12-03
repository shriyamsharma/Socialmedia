import React, {useContext} from 'react';
import {Link, useHistory}  from 'react-router-dom';
// import {Link}  from 'react-router-dom';
import {UserContext} from '../App';

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory()
  //when user is signed in so profile and create post is showed
  const renderList = () => {
    if(state){
       return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create</Link></li>,
        <li><Link to="/myfollowingpost">My Following Post</Link></li>,
        <li>
          <button className="btn waves-effect waves-light #000000 black" 
          type="submit" 
          name="action"
          onClick={() => {
            localStorage.clear()
            dispatch({type: "CLEAR"})
            history.push('/login')
          }}
          >Logout</button>
        </li>
       ]
    } else {
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }

    return (
      <nav>
        <div className="nav-wrapper black">
          <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}   

export default Navbar;