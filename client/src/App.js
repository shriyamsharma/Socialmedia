import React, {useEffect, createContext, useReducer, useContext} from 'react';
import "./App.css";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribedUserPosts';

import {initialState, reducer} from './reducers/userReducer';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(typeof(user), user) 
    if(user) {
      dispatch({type: "USER", payload: user})
      // history.push('/')
    } else {
      history.push('/login')
    }
  }, [])
  return(
    <Switch>
      <Route path='/' exact><Home /></Route>
      <Route path='/login' exact><Login /></Route>
      <Route path='/profile' exact><Profile /></Route>
      <Route path='/signup' exact><Signup /></Route>
      <Route path='/create' exact><CreatePost /></Route>
      <Route path='/profile/:userid' exact><UserProfile /></Route>
      <Route path='/myfollowingpost' exact><SubscribedUserPosts /></Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
