import React, {useEffect, useState} from 'react';
import RenderSubMenu from '../RenderSubMenu.js';
import './Setting.css';

const Setting = (props) => {

  const handlerSubMenuClick = (identifier) => {
    console.log(identifier);
  }

  useEffect(() => {
    props.handleTabChange('setting');
  }, []);

  return (
    <>
    <RenderSubMenu selSubMenus={props.selSubMenus} handlerSubMenuClick={handlerSubMenuClick}/>
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

export default Setting;
