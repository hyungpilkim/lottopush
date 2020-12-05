import React from 'react';
import Store, {Context}  from "./reducers/Store";
import Main from "./components/Main";


const App = () => {
  return (
    <Store>
       <Main />
    </Store>
  )
}

export default App;
