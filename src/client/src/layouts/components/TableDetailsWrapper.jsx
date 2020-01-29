import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from 'util/firebase';
import DetailsTable from './styled/DetailsTable';
import { Link } from 'react-router-dom';
import { parseData } from './utils/TabelDetailsUtils'


const TableDetailsWrapper = (props) => {
    const { documentId } = props.match.params;
    const { firestoreData, collectionName } = props;
    const tableFields = collections[collectionName].tableFields;
    const data = parseData(firestoreData, collectionName, documentId)
    console.log(firestoreData[collectionName][documentId])
    return (
        <DetailsTable
            size="sm"
            responsive
            striped
            headers={2}
        >
            <thead>
                <tr>
                    <th colSpan={2}>
                        {collectionName.toUpperCase()}
                    </th>

                </tr>
            </thead>

            <tbody>
                {data ? data.map(
                    ([title, value, link]) => {
                        if (!link) {
                            return (
                                <tr key={title}>
                                    <td className="left">{title}</td>
                                    <td>
                                        <ul>
                                            {
                                                value.map((val) =>(
                                                   <li>{val}</li> 
                                                ))
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            )
                        } else {
                            return (
                            <td></td>
                            )
                        }    
                    }             
                ) : null}
            </tbody>
        </DetailsTable>

    );
};

const mapStateToProps = ({ firestore }) => ({
    firestoreData: firestore.data
});

export default compose(
    firestoreConnect(({ collectionName }) => [
        collectionName,
        ...collections[collectionName].tableRefs
    ]),
    connect(mapStateToProps)
)(TableDetailsWrapper);