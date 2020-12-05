import React, {useReducer} from 'react';
import Reducer from './Reducer';
const initialState = {
    authKey: ''
}

export const Context = React.createContext(initialState);

const Store = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <Context.Provider value={{state, dispatch}}>
      {props.children}
    </Context.Provider>
  )
}


export default Store;