import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const StyledNavbar = styled(Navbar)`
    background-color: #20232a;
`;

const NavBar = ({ logout }) => (
    <StyledNavbar variant="dark" expand="lg">
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
                <NavDropdown.Item onClick={() => logout()}>Sign out</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
    </StyledNavbar>
);

export default connect(
    null,
    mapDispatchToProps
)(NavBar);