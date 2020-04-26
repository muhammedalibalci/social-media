import * as apiCalls from '../../api/userCalls';

export const loadUser = (user) => {
    return {
        type: 'GET_USER',
        payload:user
    }
}
export const loadUserHandler = (username) => {
    return function (dispatch) {
        return apiCalls.getuser(username).then((res) => {
            dispatch(loadUser(
                 res.data 
            ))
            return dispatch
        })
    }
}