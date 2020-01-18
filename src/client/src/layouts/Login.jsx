import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from 'redux/modules/auth';

const mapDispatchToProps = dispatch => ({
    login: auth => dispatch(login(auth))
});

const Login = ({ login }) => {
    const handleSubmit = event => {
        event.preventDefault();
        login({ user: 'Admin' });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control size="lg" type="text" placeholder="User login" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control size="lg" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
                <Button type="submit">Sign in</Button>
            </Form.Group>
        </Form>
    );
}

export default connect(
    null,
    mapDispatchToProps
)(Login);