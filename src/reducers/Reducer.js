const Reducer = (state, action) => {
  console.log("action : " + action);
  switch (action.type) {
    case 'reset': {
      return { authKey: ''}
    }
    case 'authKey': {
      return { authKey: action.value }
    }
    default: {
      return state
    }
  }
}


export default Reducer;