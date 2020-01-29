import React from 'react';
import Nav from 'react-bootstrap/Nav';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

export default ({ to, title }) => (
    <LinkContainer exact to={to}>
        <Nav.Link>
            {title}
        </Nav.Link>
    </LinkContainer>
);