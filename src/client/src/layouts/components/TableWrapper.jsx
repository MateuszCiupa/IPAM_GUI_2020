import React, { useState } from 'react';
import { Button, FormCheck, Jumbotron } from 'react-bootstrap';
import StyledTable from './styled/StyledTable';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from 'util/firebase';
import AddModalWrapper from './AddModalWrapper';

const TableWrapper = ({ firestoreData, collectionName, history }) => {
    const tableFields = collections[collectionName].tableFields;
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState([]);
    const [linkHover, setLinkHover] = useState(false);
    const [addShow, setAddShow] = useState(false);

    return (
        <>
            <h1 style={{ float: 'right' }}>{collectionName}</h1>
            <StyledTable 
                size="sm" 
                responsive 
                striped 
                headers={tableFields.length}
                linkHover={linkHover}
            >
                <AddModalWrapper 
                    show={addShow}
                    setShow={setAddShow}
                    collectionName={collectionName}
                />

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
                                    onClick={() => setAddShow(true)}
                                >
                                    Add
                                </Button>
                            )}
                        </th>

                        {collections[collectionName].tableFields.map(header => (
                            <th key={header}>{header[0].toUpperCase() + header.slice(1)}</th>
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
                            <tr 
                                key={documentId}
                                onClick={() => !linkHover && history.push(`/${collectionName}/${documentId}`)}
                            >

                                <td></td>

                                {tableFields.map(field => (
                                    <td key={documentId+field}>
                                        {
                                            (() => {
                                                if (!documentObject[field]) {
                                                    return '';
                                                } else if (Array.isArray(documentObject[field])) {
                                                    return documentObject[field].length;
                                                } else if (typeof documentObject[field] === 'object') {
                                                    if (firestoreData[documentObject[field].parent.path]) {
                                                        if (firestoreData[documentObject[field].parent.path][documentObject[field].id]) {
                                                            return (
                                                                <Link 
                                                                    to={`/${documentObject[field].path}`}
                                                                    onMouseEnter={() => setLinkHover(true)}
                                                                    onMouseLeave={() => setLinkHover(false)}
                                                                >
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
                                            onMouseEnter={() => setLinkHover(true)}
                                            onMouseLeave={() => setLinkHover(false)}
                                        />
                                    ) : null}
                                </td>
                            </tr>
                        )
                    ) : null}
                </tbody>
            </StyledTable>
        </>
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