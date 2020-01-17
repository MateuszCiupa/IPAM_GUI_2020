import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default () => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Link className="navbar-brand" to="/">
            IPAM
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer to="/subnets">
                    <Nav.Link>
                        Subnets
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/racks">
                    <Nav.Link>
                        Racks
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/devices">
                    <Nav.Link>
                        Devices
                    </Nav.Link>
                </LinkContainer> 

                <LinkContainer to="/nat">
                    <Nav.Link>
                        NAT
                    </Nav.Link>
                </LinkContainer>   

                <LinkContainer to="/vlan">
                    <Nav.Link>
                        VLAN
                    </Nav.Link>
                </LinkContainer>            
            </Nav>
            <Navbar.Text>Signed in as:</Navbar.Text>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item>Import</NavDropdown.Item>
                <NavDropdown.Item>Export</NavDropdown.Item>
                <NavDropdown.Divider />
                <LinkContainer to="/login">
                    <NavDropdown.Item>Sign out</NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>
        </Navbar.Collapse>
    </Navbar>
);