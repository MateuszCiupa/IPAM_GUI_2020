import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;

export const collections = {
    subnets: {
        tableFields: ['ip', 'mask', 'about', 'vlan', 'loc'],
        tableRefs: ['vlan', 'locations'],
        refs: ['devices', 'locations', 'nameservers', 'vlan'],
        linkField: 'ip'
    },
    vlan: {
        tableFields: ['id', 'about', 'subnets'],
        tableRefs: ['subnets'],
        refs: ['subnets'],
        linkField: 'name'
    },
    nat: {
        tableFields: ['name', 'device', 'subnet'],
        tableRefs: ['devices', 'subnets'],
        refs: ['devices', 'subnets'],
        linkField: 'name'
    },
    devices: {
        tableFields: ['hostname', 'owner', 'ip', 'subnet'],
        tableRefs: ['subnets'],
        refs: ['racks', 'nat', 'subnets'],
        linkField: 'hostname',
    },
    locations: {
        linkField: 'name',
    },
    racks: {
        linkField: 'name',
    }
};