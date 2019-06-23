import * as actionTypes from './types';

export const signIn = (email, password) => {
    return (dispatch, getState, {getFirebase}) => {
        console.log('getState', getState());
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            dispatch({type: actionTypes.LOGIN_SUCCESS});
        }).catch((error) => {
            dispatch({type: actionTypes.LOGIN_ERROR, error});
        });
    };
};

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: actionTypes.SIGN_OUT_SUCCESS});
        }).catch(error => {
            dispatch({type: actionTypes.SIGN_OUT_ERROR, error});
        });
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        let createdUser = null;

        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(user => {
            createdUser = user;
            return user.user.updateProfile({
                displayName: newUser.type
            });
        }).then(() => {
            return firestore.collection('users').doc(createdUser.user.uid).set({
                ...newUser
            });
        }).then(() => {
            dispatch({type: actionTypes.SIGNUP_SUCCESS, payload: {userType: newUser.type}});
        }).catch(error => {
            dispatch({type: actionTypes.SIGNUP_ERROR, error});
        });
    }
};


export const startLoading = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING});
    }
};