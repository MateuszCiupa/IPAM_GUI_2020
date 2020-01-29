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
        tableFields: ['ip', 'mask', 'about', 'vlan', 'location'],
        tableRefs: ['vlans', 'locations'],
        addFields: ['ip', 'mask', 'about', 'dhcp'],
        refs: ['devices', 'locations', 'vlans', 'nameservers'],
        linkField: 'ip'
    },
    vlans: {
        tableFields: ['id', 'about', 'subnets'],
        tableRefs: ['subnets'],
        addFields: ['id', 'name', 'about'],
        refs: ['subnets'],
        linkField: 'name'
    },
    nats: {
        tableFields: ['name', 'device', 'subnet'],
        tableRefs: ['devices', 'subnets'],
        addFields: ['ip', 'name'],
        refs: ['devices', 'subnets'],
        linkField: 'name'
    },
    devices: {
        tableFields: ['hostname', 'owner', 'ip', 'subnet'],
        tableRefs: ['subnets'],
        addFields: ['hostname', 'owner', 'about', 'ip', 'mac', 'position', 'size'],
        refs: ['racks', 'nats', 'subnets'],
        linkField: 'hostname',
    },
    locations: {
        tableRefs: [],
        refs: [],
        linkField: 'name',
    },
    racks: {
        tableFields: ['name', 'location', 'size', 'devices'],
        tableRefs: ['locations', 'devices'],
        addFields: ['name', 'about', 'size'],
        refs: ['locations', 'devices'],
        linkField: 'name',
    },
    nameservers: {
        tableRefs: [],
        refs: []
    }
};