import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { collections } from 'util/firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const AddModalWrapper = ({ show, setShow, collectionName }) => {
    const handleClose = () => setShow(false);

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {`Add to ${collectionName}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

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