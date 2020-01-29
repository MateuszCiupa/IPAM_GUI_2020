import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from 'util/firebase';
import DetailsTable from './styled/DetailsTable';
import { Link } from 'react-router-dom';
import { parseData } from './utils/TabelDetailsUtils'
import './css/rack.css'

const devices = [
    { name: "ble", size: 4, position: 12 },
    { name: "ble", size: 2, position: 12 }
]

const Rack = (props) => {
    const left = [];
    const right = [];
    const size = 40;
    const tab = [<div className="device" style={{height: 50, borderTop: 0 }}>, v</div>, <div className="device">, v</div>]
    for (let i = 0; i < size; ++i) {
        left.push(
                <div className="side">
                    o{i}
                </div>
        );
        right.push(
                <div className="side">
                    o{i}
                </div>
        )
    }
    return (

        <div className="rack">
            <div className="left">
                {left}
            </div>
            <div className="innerRack">
                <div className="empty" style={{ flex: 1 }}></div>
                {tab}
            </div>
            
            <div className="right">
                {right}
            </div>
        </div>

    )
};

const mapStateToProps = ({ firestore }) => ({
    firestoreData: firestore.data
});

export default Rack
// export default compose(
//     firestoreConnect(({ collectionName }) => [
//         collectionName,
//         ...collections[collectionName].tableRefs
//     ]),
//     connect(mapStateToProps)
// )(Rack);