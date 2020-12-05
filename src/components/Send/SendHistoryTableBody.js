import {useContext} from 'react';
import {PushHistoryContext} from './SendHistory';

const SendHistoryTableBody = () => {
  const {handleOnClick, history} = useContext(PushHistoryContext);

    var row = [];
    history.map((sendList, index) => {
      const { id,  title, body, reg_dt} = sendList 
      row.push(<tr key={index} onClick={(e)=> {e.preventDefault(); handleOnClick(id)} }>
        <td style={{width:'30px'}}>{id}</td>
        <td style={{width:'100px'}}>{title}</td>
        <td style={{width:'150px'}}>{body}</td>
        <td style={{width:'200px'}}>{reg_dt}</td>
     </tr>);
   })
   return (
     <tbody>
     {row}
     </tbody>
     );
  }

  export default SendHistoryTableBody;    