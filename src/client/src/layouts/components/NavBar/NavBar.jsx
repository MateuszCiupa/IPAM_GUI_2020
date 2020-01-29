import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signOut } from 'redux/modules/auth';
import { NavLink, NavDropdownLink } from './index';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
    background-color: #20232a;
`;

const NavBar = ({ signOut, loading }) => (
    <StyledNavbar variant="dark" expand="lg">
        <Link className="navbar-brand" to="/">
            IPAM
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Network" id="network=nav-dropdown">
                    <NavDropdownLink to="/subnets" title="Subnets" />
                    <NavDropdownLink to="/vlans" title="VLAN" />
                    <NavDropdownLink to="/nats" title="NAT" />
                </NavDropdown>
                <NavLink to="/racks" title="Racks" />
                <NavLink to="/devices" title="Devices" />       
            </Nav>

            <Navbar.Text>Signed in as:</Navbar.Text>

            <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item>Import</NavDropdown.Item>
                <NavDropdown.Item>Export</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                    disabled={loading}
                    onClick={signOut}
                >
                    Sign out
                </NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>

    </StyledNavbar>
);

const mapStateToProps = ({ auth: { loading } }) => ({
    loading
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);