const LOGIN = 'ipam/auth/LOGIN';
const LOGOUT = 'ipam/auth/LOGOUT';

const initialState = {
    loggedIn: false
};

export default (state = initialState, { type, auth }) => {
    switch (type) {
        case LOGIN:
            return {
                loggedIn: true,
                auth
            };
        case LOGOUT:
            return {
                loggedIn: false
            };
        default:
            return state;
    }
};

export const login = auth => ({
    type: LOGIN,
    auth
});

export const logout = () => ({
    type: LOGOUT
});