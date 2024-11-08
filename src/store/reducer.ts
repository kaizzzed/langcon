interface Action {
    type: string;
    payload?: any; // If actions have a payload, you can add the type here
  }
  
  const initialState = {
    count: 0
  };
  
  const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 };
      case "DECREMENT":
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  };
  
  export default reducer;