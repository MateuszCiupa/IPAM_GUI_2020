import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import firebase from 'util/firebase';

const rrfConfig = { 
    userProfile: 'users',
    useFirestoreForProfile: true
};

export default createStore(
    rootReducer,
    compose(
        reduxFirestore(firebase),
        reactReduxFirebase(firebase, rrfConfig),
        applyMiddleware(thunk.withExtraArgument({ 
            getFirebase, 
            getFirestore 
        }))
    )
);