let initialState = {
    auth: {
      username:'',
      name: '',
      image: ''
    }
  };
  
  export default function userReducer(state = initialState, action) {
  
    if (action.type === 'GET_USER') {
      return Object.assign({},initialState.auth,{username:action.payload.userName,...action.payload,isLogin:true})
      
    }
  
    return state
  }
  