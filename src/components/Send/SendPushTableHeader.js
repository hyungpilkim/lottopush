import {useContext} from 'react';
import {SendPushContext} from './SendPush';

const SendPushTableHeader = () => {
  const {selectAll, handleCheckBoxAllChange} = useContext(SendPushContext);

    return (
      <thead>
        <tr>
      <th key="1"><input type="checkbox" checked={selectAll === 1} ref={input => {
										if (input) {
											input.indeterminate = selectAll === 2;
										}
									}}
									onChange={handleCheckBoxAllChange}/></th>
      <th key="2">token</th>
      <th key="4">타입</th>
      <th key="5">수신동의여부</th>
      </tr>
      </thead>
    );
  }

  export default SendPushTableHeader;