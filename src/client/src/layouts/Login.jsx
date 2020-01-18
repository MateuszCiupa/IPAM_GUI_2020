import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default ({ history, setLoggedIn }) => {
    const handleSubmit = event => {
        event.preventDefault();
        setLoggedIn(true);
        history.push('/');
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