import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

export default ({ to, title }) => (
    <LinkContainer exact to={to}>
        <NavDropdown.Item>
            {title}
        </NavDropdown.Item>
    </LinkContainer>
);