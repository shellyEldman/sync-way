import * as actionTypes from '../actions/types';

const initState = {
    authError: null,
    loading: false,
    newUserType: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            console.log('loading');
            return {
                ...state,
                loading: true,
                authError: false
            };
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                authError: false,
                newUserType: action.payload.userType
            };
        case actionTypes.SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                authError: action.error
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                authError: false
            };
        case actionTypes.LOGIN_ERROR:
            console.log('login error');
            return {
                ...state,
                loading: false,
                authError: action.error
            };
        case actionTypes.SIGN_OUT_SUCCESS:
            console.log('sign out success');
            return state;
        case actionTypes.SIGN_OUT_ERROR:
            console.log('sign out error');
            return {
                ...state,
                authError: action.error
            };
        default:
            return state;
    }
};

export default authReducer;