import React, {useContext, useState, useReducer} from 'react';
import { RoutercompoenetProps} from 'react-router'
import { useLocation } from 'react-router-dom'
import "../App.css";
import {Context}  from "../reducers/Store";
import Login from "./Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home/Home';
import Send from './Send/Send';
import Setting from './Setting/Setting';

const Main = () => {
  const {state, dispatch} = useContext(Context);
  console.log("Main  state: " + JSON.stringify(state));
  const [selSubMenus, setSelSubMenus] = useState([]);
  const [topMenu, setTopMenu] = useState("home");
  const [subMenus, setSubMenus] = useState([
    {identifier:'about', titie:'about', menu:'home'},
    {identifier:'send_push', titie:'send push', menu:'send'}, 
    {identifier:'send_history', titie:'send history', menu:'send'},
    {identifier:'fire_base', titie:'fire-base', menu:'setting'}, 
    {identifier:'db', titie:'db', menu:'setting'}
  ]);

  const handleTabChange = (newTopmenu) => {
    console.log("Main  state: " + JSON.stringify(state));
    if (topMenu === newTopmenu)
      return;
    setSelSubMenus(subMenus.filter(menu => menu.menu === newTopmenu));
    setTopMenu(newTopmenu);
  }

  const TopMenuComponeunt = () => {
    return (
      <header>
            <a className="logo" href="#home">LottoPush</a>
            <nav>
              <ul className="nav-items">
                <li className={`${topMenu === "home"? 'active': ''}`}  ><Link to="/home">Home</Link></li>
                <li className={`${topMenu === "send"? 'active': ''}`} ><Link to="/send">Send</Link></li>
                <li className={`${topMenu === "setting"? 'active': ''}`} ><Link to="/setting">Setting</Link></li>
                <li onClick={()=>{ dispatch({ type: 'reset' }) }}>LogOut</li>
              </ul>
            </nav>
          </header>
    )
  }

  const AdminComponent = () => {
    return (
      <Router>
        <div>
        <div id="wrap">
          <TopMenuComponeunt />
          <div id="content-wrap">
              <Switch>
                <Route exact path='/home' render={() => <Home handleTabChange={handleTabChange} selSubMenus={selSubMenus} /> }/>
                <Route exact path='/send' render={() =>  <Send handleTabChange={handleTabChange}  selSubMenus={selSubMenus}/> }/>
                <Route exact path='/setting' render={() => <Setting handleTabChange={handleTabChange}  selSubMenus={selSubMenus} />}/>
              </Switch>
          </div>
          <footer>© Copyright</footer>
        </div>
        </div>
      </Router>
    ); 
  }

  return (
    <>
    { state.authKey != '' ?  <AdminComponent /> : <Login />}
    </>
  )
}

export default Main;
