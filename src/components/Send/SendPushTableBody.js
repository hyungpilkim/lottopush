import {useContext} from 'react';
import {SendPushContext} from './SendPush';

//테이블 리스트 
const SendPushTableBody = () =>  {
  const {accouts, selected, handleCheckBoxChange} = useContext(SendPushContext);

    var row = [];
    accouts.map((accout, index) => {
       const { device_token, device_type, agreeYn } = accout 
       row.push(<tr key={index}>
          <td style={{width:'50px'}}><input type="checkbox" checked={selected[device_token] === true} onChange={()=>handleCheckBoxChange(device_token)}/></td>
          <td style={{width:'150px'}}>{device_token}</td>
          <td style={{width:'50px'}}>{device_type}</td>
          <td style={{width:'100px'}}>{agreeYn}</td>
      </tr>);
    })
    return (
      <tbody>
      {row}
      </tbody>
      );
  }

  export default SendPushTableBody;