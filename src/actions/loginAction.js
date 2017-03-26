import * as types from '../constants';
import getUser from '../api'

const TAG = "Login Action : ";
export function loginRequest(clientId, clientSecret) {
    return {
        type: types.LOGIN_REQUEST,
        clientId,
        clientSecret,
    }
}

export function loginSuccess(token, user) {
    console.log(TAG+"LOGIN_SUCCESS "+ JSON.stringify(token));
    return {
        type : types.LOGIN_SUCCESS,
        token: token,
        user : user,
    }
}

export function loginFailure(err) {
    return {
        type: types.LOGIN_FAILURE,
        error: err,
    }
}

export function logout() {
    return {
        type: types.LOGOUT_REQUEST,
    }
}

export function fetchDataLogin(clientId, clientSecret) {
    console.log(TAG+"fetchDataLogin " + clientId +" - - "+clientSecret);
    return (dispatch) => {
        dispatch(loginRequest(clientId, clientSecret))
        getUser(clientId, clientSecret)
            .then((user) => {
                console.log(TAG+"getUser from API data "+ JSON.stringify(user));
                if(user !== null) {
                    dispatch(loginSuccess(user.token, user))
                }else
                    dispatch(loginFailure("Fuck , Fail Again ??? Really."))
            })
            .catch((err) => console.log('err:', err))
    }
}
