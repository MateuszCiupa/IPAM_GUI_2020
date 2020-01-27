const AUTH_SUCCESS = 'ipam/auth/AUTH_SUCCESS';
const AUTH_START = 'ipam/auth/AUTH_START';
const AUTH_END = 'ipam/auth/AUTH_END';
const AUTH_FAIL = 'ipam/auth/AUTH_FAIL';

const initialState = {
    error: null,
    loading: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_START:
            return { ...state, loading: true };

        case AUTH_END:
            return { ...state, loading: false };

        case AUTH_FAIL:
            return { ...state, error: payload };

        case AUTH_SUCCESS:
            return { ...state, error: false };

        default:
            return state;
    }
};

export const signIn = user => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: AUTH_START });
    const { email, password } = user;
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch({ type: AUTH_SUCCESS });
    } catch (err) {
        dispatch({ type: AUTH_FAIL, payload: err.message });
    }
    dispatch({ type: AUTH_END });
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: AUTH_START });
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.log(err);
    }
    dispatch({ type: AUTH_END });
};