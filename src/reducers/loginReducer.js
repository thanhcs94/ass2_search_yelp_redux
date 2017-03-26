import * as type  from '../constants'
const initialState = {
    isAuthenticated: false,
    isFetching: false,
    token: '',
    user: {},
    errorMessage: '',
}
export default function loginReducer(state= initialState, action) {
    switch (action.type) {
        case type.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            };
        case type.LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS "+ action.user);
            return Object.assign({}, state,{
                isFetching: false,
                isAuthenticated: true,
                failure: false,
                token: action.token,
                user: action.user,
            });
        case type.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                failure: true,
                errorMessage: action.error,
            });
        case type.LOGOUT_REQUEST:
            return initialState;
        default:
            return state;
    }
}