import React, {useState, useEffect} from 'react';
import RenderSubMenu from '../RenderSubMenu.js';
import SendHistory from './SendHistory.js';
import SendPush from './SendPush.js';

const Send = (props) => {
  const [subMenu, setSubMenu] = useState('send_push');

  const handlerSubMenuClick = (identifier) => {
    console.log(identifier);
    setSubMenu(identifier);
    console.log(subMenu);
  }

  useEffect(() => {
    props.handleTabChange('send');
  }, []);

  //렌더 
  return (
    <>
    <RenderSubMenu selSubMenus={props.selSubMenus} handlerSubMenuClick={handlerSubMenuClick} />
    <section > 
    <article >
    {(() => {
        switch (subMenu) {
          case "send_push":   return <SendPush />;
          case "send_history": return <SendHistory />;
        }
      })()}
    </article >
    </section > 
    </>
  )
}
  

export default Send;
