import React, {useEffect, useContext} from 'react';
import RenderSubMenu from '../RenderSubMenu.js';
import {Context}  from "../../reducers/Store";
import './Home.css';

const Home = (props) => {
  const {state, dispatch} = useContext(Context);
  console.log(state);
  const handlerSubMenuClick = (identifier) => {
    console.log(identifier);
  }

  useEffect(() => {
    props.handleTabChange('home');
  }, []);

  return (
    <>
    <RenderSubMenu selSubMenus={props.selSubMenus} handlerSubMenuClick={handlerSubMenuClick} />
    <section > 
      <article >
        <div>
        <h1 id='title'>topMenu: {props.topMenu}</h1>
        <h1 id='title'>firebase fcm 서버. </h1>
      </div>
      </article>
    </section>
    </>
  )
}

export default Home;
