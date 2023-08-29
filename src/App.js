import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Profile from "./components/profile/Profile";
import AuthContext from "./store/auth-context";
import { useSelector } from 'react-redux';

function App() {
  // const auth = useContext(AuthContext);
  // const login = auth.islogin;
  const auth=useSelector((state) => state.auth);
  const login =auth.token==null?false:true;
  console.log('login',auth.token,login)
  return (
    <>
      <Switch>
        <Route exact path="/">
          {login && <Redirect to="/expenses" />}
          {!login && <Signup/>}
        </Route>

        <Route exact path="/login">
        {login && <Redirect to="/expenses" />}
          {!login && <Login/> }
        </Route>

        <Route exact path="/expenses">
          {login && <Expenses />}
          {!login && <Redirect to="/login" />}
        </Route>

        <Route exact path="/profile">
          {login && <Profile />}
          {!login && <Redirect to="/login" />}
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
