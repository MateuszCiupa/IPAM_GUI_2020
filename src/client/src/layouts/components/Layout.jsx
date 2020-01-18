import React from 'react';
import Container from 'react-bootstrap/Container';

export default ({ children }) => (
    <Container fluid className="p-5">
        {children}
    </Container>
);