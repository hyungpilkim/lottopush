import {useRef, useContext} from 'react';
import apiFetch from '../common/apiFetch';
import {Context}  from "../reducers/Store";

const Login = () => {
  const {state, dispatch} = useContext(Context);

  const inputIdRef = useRef(false);
  const inputPwRef = useRef(false);

  const fetchUserData = (e) => {
    apiFetch.login(inputIdRef.current.value, inputPwRef.current.value, function(response){
      response.then(result =>{
        console.log("callback : " + result.data)
        if (response.data != '') {
          dispatch({type:'authKey', value: result.data });
        }
      });
    });
  }
  

  return (
    <>
    <p>PUSH SERVER : 로그인이 필요합니다.</p>
    <div className="container">   
        <label>Username : </label>   
        <input type="text" placeholder="Enter Username" ref={inputIdRef} name="username" required ></input>  
        <label>Password : </label>   
        <input type="password" placeholder="Enter Password" ref={inputPwRef}  name="password" required ></input>  
        <button type="submit" onClick={fetchUserData}>Login</button>   
    </div>   
    </>
  )
}

export default Login;