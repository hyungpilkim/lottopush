import React, {useState, useEffect, useContext} from 'react';
import './SendHistory.css';
import RenderLeftTableHeader from './SendHistoryTableHeader.js';
import RenderLeftTableBody from './SendHistoryTableBody.js';
import RenderDtlTableHeader from './SendHistoryDtlTableHeader.js';
import RenderDtlTableBody from './SendHistoryDtlTableBody.js';
import apiFetch from '../../common/apiFetch.js';
import {Context}  from "../../reducers/Store";

export const PushHistoryContext = React.createContext();

const SendHistory = (props) => {
  const {state, dispatch} = useContext(Context);
  console.log("SendHistory state : " + JSON.stringify(state));
  const [history, setHistory] = useState([]);
  const [detailData, setDetailData] = useState([]);
 
  const fetchData = () => {
    apiFetch.history(state.authKey, function(response){
      response.then(result =>{
        if (result.data != '') {
          setHistory(result.data);
         }
      });
    });   
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = (push_id) => {

    apiFetch.dtl(state.authKey, push_id, function(response){
      response.then(result =>{
        if (result.data != '') {
          setDetailData(result.data); 
         }
      });
    });   
  }
  
  return (
    <PushHistoryContext.Provider value={{handleOnClick, history, detailData}}>
    <div>
      <div className="split left">
        <div className="centered">
          <h2>발송 내역</h2>
          <table id='sendlist'> 
            <RenderLeftTableHeader />
            <RenderLeftTableBody history={history} handleOnClick={handleOnClick}/>
          </table>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <h2>상세 내용</h2>
          <table id='sendlist'>
            <RenderDtlTableHeader />
            <RenderDtlTableBody detailData={detailData}/>
          </table>
        </div>
      </div>
    </div>
    </PushHistoryContext.Provider>
  )
}

export default SendHistory;
