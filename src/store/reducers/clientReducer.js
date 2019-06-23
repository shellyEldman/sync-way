import * as actionTypes from '../actions/types';

const initState = {
    newRideError: false,
    error: null
};

const clientReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_RIDE_CLIENT_SUCCESS:
            return {
                ...state,
                newRideError: false,
                error: null
            };
        case actionTypes.ADD_NEW_RIDE_CLIENT_ERROR:
            return {
                ...state,
                newRideError: true,
                error: action.error
            };
        default:
            return state;
    }
};

export default clientReducer;