import React, {useState, useEffect, useContext} from 'react';
import './SendPush.css';
import apiFetch from '../../common/apiFetch.js';
import SendBox from './SendPushBox.js';
import TableBody from './SendPushTableBody.js';
import TableHeader from './SendPushTableHeader.js';
import {Context}  from "../../reducers/Store";

export const SendPushContext = React.createContext();

const SendPush = (props) => {
  const {state, dispatch} = useContext(Context);

  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(0);
  const [accouts, setAccouts] = useState([]);

  const fetchData = () => {
    apiFetch.user(state.authKey, function(response){
      response.then(result =>{
        if (result.data != '') {
          setAccouts(result.data);
        }
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  //table 유저 all 선택 
  const handleCheckBoxAllChange = (e) => {
    let newSelected = {};

		if (selectAll === 0) {
			accouts.forEach(x => {
				newSelected[x.device_token] = true;
			});
		}

    setSelected(newSelected);
    setSelectAll(selectAll === 0 ? 1 : 0);
  }
  //table 유저 선택 
  const handleCheckBoxChange = (device_token) => {
    const newSelected = Object.assign({}, selected);
    newSelected[device_token] = !selected[device_token];
    setSelected(newSelected);
    setSelectAll(2);
  }

  //보내기 선택 
  const handleSendPush = (title, body) => {
    //push 발송 
    var isOk = window.confirm("발송 하겠습니까");
    if (isOk) {
      window.alert("발송");
    }
    console.log('title: ' + title);
    console.log('body: ' + body);

    var userIds = [];
    var selArray = Object.entries(selected)
    var userIds = selArray.map(entyry => entyry[0]);
    
    apiFetch.push(state.authKey, userIds, title, body, function(response){
      response.then(result =>{
        if (result.data != '') {
          alert("보내기 성공");
        }
      });
    });
  }

  //렌더 
  return (
    <SendPushContext.Provider value={{handleSendPush, handleCheckBoxAllChange, handleCheckBoxChange, accouts, selected, selectAll}}>
      <div>
          <SendBox />
          <table id='acounts'>
            <TableHeader />
            <TableBody  />
          </table>
      </div>
    </SendPushContext.Provider>
  )
}
  

export default SendPush;
