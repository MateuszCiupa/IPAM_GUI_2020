import React, { useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import StyledTable from './styled/StyledTable';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from 'util/firebase';

const TableWrapper = ({ firestoreData, collectionName }) => {
    const tableFields = collections[collectionName].tableFields;
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState([]);

    return (
        <StyledTable 
            size="sm" 
            responsive 
            striped 
            headers={tableFields.length}
        >
            <thead>
                <tr>
                    <th>
                        {edit ? (
                            <Button 
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                    setEdit(false);
                                    setSelected([]);
                                }}
                            >
                                Cancel
                            </Button>
                        ) : (
                            <Button 
                                size="sm"
                            >
                                Add
                            </Button>
                        )}
                    </th>

                    {collections[collectionName].tableFields.map(header => (
                        <th key={header}>{header}</th>
                    ))}

                    <th>
                        {edit ? (
                            <Button 
                                size="sm" 
                                variant="danger"
                                disabled={selected.length === 0}
                            >
                                Delete
                            </Button>
                        ) : (
                            <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </th>
                </tr>
            </thead>

            <tbody>
                {firestoreData[collectionName] ? Object.entries(firestoreData[collectionName]).map(
                    ([documentId, documentObject]) => (
                        <tr key={documentId}>

                            <td></td>

                            {tableFields.map(field => (
                                <td key={documentId+field}>
                                    {
                                        (() => {
                                            if (Array.isArray(documentObject[field])) {
                                                return documentObject[field].length;
                                            } else if (documentObject[field].parent) {
                                                if (firestoreData[documentObject[field].parent.path]) {
                                                    return (
                                                        <Link to={`/${documentObject[field].path}`}>
                                                            {firestoreData
                                                                [documentObject[field].parent.path]
                                                                [documentObject[field].id]
                                                                [collections[documentObject[field].parent.path].linkField]
                                                            }
                                                        </Link>
                                                    );
                                                } else {
                                                    return '';
                                                }
                                            } else {
                                                return documentObject[field];
                                            }
                                        })()
                                    }
                                </td>
                            ))}

                            <td>
                                {edit ? (
                                    <FormCheck 
                                        type="checkbox"
                                        onClick={() => 
                                            setSelected(prev => 
                                                prev.includes(documentId) ? 
                                                prev.filter(id => id !== documentId) : 
                                                prev.concat(documentId)
                                            )
                                        }
                                    />
                                ) : null}
                            </td>
                        </tr>
                    )
                ) : null}
            </tbody>
        </StyledTable>
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
)(TableWrapper);