import {useContext} from 'react';
import {PushHistoryContext} from './SendHistory';

const SendHistoryDtlTableBody = (props) => {
  const {detailData} = useContext(PushHistoryContext);

    var row = [];
    detailData.map((detail, index) => {
      const { push_id, token, result} = detail
      row.push(
        <tr key={index} >
            <td style={{width:'50px', align:'left'}}>{push_id}</td>
            <td style={{width:'200px', align:'left'}}>{token}</td>
            <td style={{width:'200px', align:'left'}}>{result}</td>
        </tr>);
   })
   return (
     <tbody>
     {row}
     </tbody>
     );
  }

export default SendHistoryDtlTableBody;