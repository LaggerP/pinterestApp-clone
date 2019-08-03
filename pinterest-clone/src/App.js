import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home.js'
import LandingUser from './components/LandingUser.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import UserProfile from './components/UserProfile.js'
import Profiles from './components/Profiles.js'
import ProtectedRoute from './ProtectedRoute.js'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/profiles" component={Profiles}/>
      <ProtectedRoute exact path="/home" component={LandingUser}/>
      <ProtectedRoute exact path="/me" component={UserProfile}/>
      <Route path="*" component={()=>"404 not Found"}/>
    </Switch>
  );
}

export default App;
