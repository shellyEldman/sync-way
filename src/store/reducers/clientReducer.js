import * as actionTypes from '../actions/types';

const initState = {
    newRideError: false
};

const clientReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_RIDE_CLIENT_SUCCESS:
            return {
                ...state,
                newRideError: false
            };
        case actionTypes.ADD_NEW_RIDE_CLIENT_ERROR:
            return {
                ...state,
                newRideError: true
            };
        default:
            return state;
    }
};

export default clientReducer;