import React from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { collections } from 'util/firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const firstUpper = x => x[0].toUpperCase() + x.slice(1);
const withoutS = x => x.slice(0, x.length - 1);

const AddModalWrapper = ({ show, setShow, collectionName, firestoreData }) => {
    const handleClose = () => setShow(false);

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {`Add to ${collectionName}`}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {collections[collectionName].addFields.map(fieldName => (
                        <Form.Group key={fieldName}>
                            <Form.Label>
                                {firstUpper(fieldName)}
                            </Form.Label>
                            <Form.Control 
                                as="input" 
                                size="sm" 
                                type="text" 
                                placeholder={`Enter ${fieldName}`}
                            />
                        </Form.Group>
                    ))}
                    {collections[collectionName].refs.map(refName => (
                        <Form.Group key={refName}>
                            <Form.Label>
                                {firstUpper(withoutS(refName))}
                            </Form.Label>
                            <Form.Control as="select">
                                {firestoreData[refName] && Object.entries(firestoreData[refName]).map(([id, doc]) => (
                                    <option key={id}>
                                        {doc[collections[refName].linkField]}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleClose}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = ({ firestore }) => ({
    firestoreData: firestore.data
});

export default compose(
    firestoreConnect(({ collectionName }) => [
        collectionName,
        ...collections[collectionName].refs
    ]),
    connect(mapStateToProps)
)(AddModalWrapper);