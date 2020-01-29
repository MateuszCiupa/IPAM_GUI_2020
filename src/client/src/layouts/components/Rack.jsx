import React from 'react';

import './css/rack.css'

const devices = [
    { name: "ble", size: 4, position: 12 },
    { name: "ble", size: 2, position: 12 }
]

const Rack = (props) => {
    const { rackInfo } = props;
    const left = [];
    const right = [];
    const size = 40;
    const tab = []
    for (let i = 1; i <= rackInfo.size; ++i) {
        left.push(
            <div className="side">
                {i}
            </div>
        );
        right.push(
            <div className="side">
                {i}
            </div>
        )
    }

    for (let i = 1; i <= rackInfo.size; ) {      
        if (rackInfo.devices[i]) {
            tab.push(
                <div className="device" style={{ height: 25 * rackInfo.devices[i].size}}>
                    { rackInfo.devices[i].name }
                </div>
            )
            i += rackInfo.devices[i].size;
        } else {
            tab.push(<div className="empty"></div>);
            ++i;
        }
     
    }

    // for (const device of rackInfo.devices) {
    //     const containTopBorder = !(device.position === 0);
    //     tab.push(
    //         <div className="device" style={{ height: 25 * device.size}}>
    //             { device.name }
    //         </div>
    //     )
    // }

    return (

        <div className="rack">
            <div className="leftSide">
                {left}
            </div>
            <div className="innerRack">
                {tab}
            </div>

            <div className="rightSide">
                {right}
            </div>
        </div>

    )
};

export default Rack
