import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from 'util/firebase';
import StyledTableCard from './styled/DetailsTable';
import { Link } from 'react-router-dom';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const TableDetailsWrapper = (props) => {
    const { documentId } = props.match.params;
    const { firestoreData, collectionName } = props;
    const tableFields = collections[collectionName].tableFields;

    console.log(firestoreData[collectionName][documentId])
    return (
        <StyledTableCard
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
                {firestoreData[collectionName] ? Object.entries(firestoreData[collectionName][documentId]).map(
                    ([title, value]) => (
                        <tr key={title}>
                            <td className="left">{capitalize(title)}</td>
                            <td>{typeof (value) == "string" ? value : ''}</td>

                        </tr>
                    )
                ) : null}
            </tbody>
        </StyledTableCard>

    );
    // return (
    //     <Card style={{ maxWidth: '550px', alignSelf: 'center' }}>
    //         <Card.Body>
    //             {/* <Card.Title>This is: {props.collectionName}</Card.Title> */}
    //             <StyledTableCard
    //                 size="sm"
    //                 responsive
    //                 striped
    //                 headers={2}
    //             >
    //                 <thead>
    //                     <tr>
    //                         <th colSpan={2}>
    //                             {collectionName}
    //                         </th>

    //                     </tr>
    //                 </thead>

    //                 <tbody>
    //                 {firestoreData[collectionName] ? Object.entries(firestoreData[collectionName][documentId]).map(
    //                 ([title, value]) => (
    //                     <tr key={documentId}>
    //                         <td className="left">{capitalize(title)}</td>
    //                         <td>{typeof(value) == "string" ? value : ''}</td>                            

    //                     </tr>
    //                 )
    //             ) : null}
    //                 </tbody>
    //             </StyledTableCard>
    //             {/* <Card.Subtitle>Subtitle is awesome{documentId}</Card.Subtitle>
    //             <Card.Text>
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                 Tenetur ipsa ex provident veniam dolore unde officia illo ad totam,
    //                 dicta omnis delectus dolorum nostrum voluptatum illum porro esse laudantium quaerat.
    //             </Card.Text> */}
    //             <Button>Delete?</Button>
    //         </Card.Body>
    //     </Card>
    // );
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