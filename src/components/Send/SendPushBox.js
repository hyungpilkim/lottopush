import {useContext, useRef} from 'react';
import {SendPushContext} from './SendPush';

const SendPushBox = () => {
  const inputTitleRef = useRef(false);
  const inputBodyRef = useRef(false);
  const {handleSendPush} = useContext(SendPushContext);
  const sendPushMessage = (e) => {
    e.preventDefault();
    handleSendPush(inputTitleRef.current.value, inputBodyRef.current.value);
  }
  return (
    <div id="formContainer">
      <div id="form-div">
        <div className="sendbox_title">보낼 내용을 작성하세요</div>
        <form className="form" id="form1">
          <p className="title">
            <input name="name" type="text" className="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Title" id="title" ref={inputTitleRef} />
          </p>
          
          <p className="body">
            <input name="email" type="text" className="validate[required,custom[email]] feedback-input" id="body" placeholder="Body" ref={inputBodyRef} />
          </p>
          
          {/* <p className="text">
            <textarea name="text" className="validate[required,length[6,300]] feedback-input" id="comment" placeholder="Comment"></textarea>
          </p> */}
          <div className="submit" >
            <input type="button" value="SEND" id="button-blue" onClick={sendPushMessage} />
            <div className="ease"></div>
          </div>
        </form>
      </div>
    </div>
    )
  }

export default SendPushBox;  