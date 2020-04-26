import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import userReducer from '../redux/reducers/userReducer'
import postReducer from '../redux/reducers/postReducer'
import jwt_decode from 'jwt-decode'
const configureStore = () => {
    let token = localStorage.getItem('token');

    let persistedState = {
        auth: {
            username: '',
            isLogin: false
        }
    };
    if (token) {
        const decode_token = jwt_decode(token)
        try {
            persistedState = {
                auth: {
                    username:decode_token.sub,
                    isLogin:true,
                }
            }
        } catch (error) { }
    }
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
    );

    const store = createStore(combineReducers({ auth: userReducer, postReducer }), persistedState, enhancer);
  

    return store;
};

export default configureStore;