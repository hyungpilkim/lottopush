import {useState} from 'react';

const RenderSubMenu = (props) => {

  const [subId, setSubId] = useState('');

  var listItems = props.selSubMenus.map((menu) =>
    <li key={menu.titie}><a className={`${menu.identifier === subId? 'active': ''}`} onClick={(e)=> { 
        e.preventDefault(); 
        setSubId(menu.identifier);
        props.handlerSubMenuClick(menu.identifier);
      }}>{menu.titie}</a></li>
  );
  return (
    <aside> 
    <ul>{listItems}</ul>
    </aside>
  );
}

export default RenderSubMenu;