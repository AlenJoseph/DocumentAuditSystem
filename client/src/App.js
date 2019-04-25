import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage.js';
import SignupPage from './components/pages/SignupPage';
import DashBoardPage from './components/pages/DashBoard';
import AdminDashBoardPage from './components/pages/AdminDashBoard';
import AdminLoginPage from  './components/pages/AdminLoginPage';
const App = () => (
<div className="ui container">
  <Route path="/" exact component={HomePage}/>
  <Route path="/login" exact component={LoginPage}/>
  <Route path="/Signup" exact component={SignupPage}/>
  <Route path="/DashBoard" exact component={DashBoardPage}/>
  <Route path="/AdminDashBoard" exact component={AdminDashBoardPage}/>
  <Route path="/adminlogin" exact component={AdminLoginPage}/>
</div>
)



export default App;
