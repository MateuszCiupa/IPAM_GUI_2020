import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from 'util/firebase';
import TableDetailsWrapper from './TableDetailsWrapper';
import  Rack from './Rack';
import { parseDataForRacks } from './utils/TabelDetailsUtils'


const RackTableWrapper = (props) => {
    const { documentId } = props.match.params;
    const { firestoreData, collectionName } = props;
    const rackInfo = parseDataForRacks(firestoreData, collectionName, documentId)
    return (
        <div>
            <TableDetailsWrapper
                firestoreData={props.firestoreData}
                collectionName={props.collectionName}
                match={props.match}
                showRacks={true}
            />
            <Rack rackInfo={rackInfo} />
        </div>
    )
}

const mapStateToProps = ({ firestore }) => ({
    firestoreData: firestore.data
});

export default compose(
    firestoreConnect(({ collectionName }) => [
        collectionName,
        ...collections[collectionName].tableRefs
    ]),
    connect(mapStateToProps)
)(RackTableWrapper);