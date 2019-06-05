import * as actionTypes from './types';

export const addNewRideClient = (clientCompanyId, providerCompanyId, newRide) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('new_ride').add({
            client: clientCompanyId,
            supplier: providerCompanyId,
            ride: newRide,
        }).then((res) => {
            console.log('new ride added', res);
            dispatch({type: actionTypes.ADD_NEW_RIDE_CLIENT_SUCCESS});
        }).catch(err => {
           console.log('new ride error', err);
            dispatch({type: actionTypes.ADD_NEW_RIDE_CLIENT_ERROR});
        });
    }
};