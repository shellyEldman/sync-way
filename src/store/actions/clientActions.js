import * as actionTypes from './types';

export const addNewRideClient = (providerCompanyId, route, selectedDate, exactHours, totalDuration, exactDistance) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('new_ride').add({
            client: profile.companyNum,
            author: profile,
            authorId,
            supplier: providerCompanyId,
            route: route,
            selectedDate,
            exactHours,
            totalDuration,
            exactDistance,
            createdAt: new Date()
        }).then((res) => {
            console.log('new ride added', res);
            dispatch({type: actionTypes.ADD_NEW_RIDE_CLIENT_SUCCESS});
        }).catch(err => {
            console.log('new ride error', err);
            dispatch({type: actionTypes.ADD_NEW_RIDE_CLIENT_ERROR, error: err});
        });
    }
};