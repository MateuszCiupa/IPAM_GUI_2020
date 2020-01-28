import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default ({ collectionName }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>This is: {collectionName}</Card.Title>
                <Card.Subtitle>Subtitle is awesome</Card.Subtitle>
                <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Tenetur ipsa ex provident veniam dolore unde officia illo ad totam, 
                    dicta omnis delectus dolorum nostrum voluptatum illum porro esse laudantium quaerat.
                </Card.Text>
                <Button>Delete?</Button>
            </Card.Body>
        </Card>
    );
};