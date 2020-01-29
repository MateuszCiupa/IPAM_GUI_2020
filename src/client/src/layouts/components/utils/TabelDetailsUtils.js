
import { Link } from 'react-router-dom';
import React from 'react';
import { collections } from '../../../util/firebase';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


export const parseData = (firestoreData, collectionName, documentId) => {
    const data = firestoreData[collectionName][documentId];
    const parsedData = [];
    if (!data) {
        return {}
    }
    Object.entries(data).map(
        ([title, value]) => {
            const newData = []
            if (typeof value == 'string') {
                newData.push(capitalize(title), [value]);
                parsedData.push(newData);
            } else if (typeof value == 'number' || typeof value == 'boolean') {
                newData.push(capitalize(title), [value.toString()]);
                parsedData.push(newData);
            } else if (Array.isArray(value)) {
                const list = []
                value.map(
                    (val) => {
                        if (typeof val == 'string') {
                            list.push(val);
                        } else if (typeof val == 'number' || typeof val == 'boolean') {
                            list.push(val.toString());
                        } else if (typeof val === 'object') {
                            if (firestoreData[val.parent.path]) {
                                if (firestoreData[val.parent.path][val.id]) {
                                    const link = <Link
                                        to={`/${val.path}`}
                                    >
                                        {firestoreData
                                        [val.parent.path]
                                        [val.id]
                                        [collections[val.parent.path].linkField]
                                        }
                                    </Link>
                                    list.push(link);
                                }
                            }
                        }
                    }
                )
                newData.push(capitalize(title), list);
                parsedData.push(newData);
            } else if (typeof value === 'object') {
                if (firestoreData[value.parent.path]) {
                    if (firestoreData[value.parent.path][value.id]) {
                        const link = <Link
                            to={`/${value.path}`}
                        >
                            {firestoreData
                            [value.parent.path]
                            [value.id]
                            [collections[value.parent.path].linkField]
                            }
                        </Link>
                        newData.push(capitalize(title), [link]);
                        parsedData.push(newData);
                    }
                }
            }

        }
    )
    return parsedData;
}

export const parseDataForRacks = (firestoreData, collectionName, documentId) => {
    const data = firestoreData[collectionName][documentId];
    console.log(data)
    let parsedData = {};
    const devices = {}
    if (!data || !data.size || !data.devices) {
        return {}
    }
    parsedData['size'] = data.size;
    parsedData['name'] = data.about;
    for (const devRef of data.devices) {
        let newDevice = {}
        if (firestoreData[devRef.parent.path]) {
            if (firestoreData[devRef.parent.path][devRef.id]) {                
                const tempDevice = firestoreData[devRef.parent.path][devRef.id]
                newDevice = {
                    "name": tempDevice.about,
                    "size": tempDevice.size
                }
                devices[tempDevice.position] = newDevice;
            }
        }
    }
    parsedData['devices'] = devices;
    return parsedData;
}