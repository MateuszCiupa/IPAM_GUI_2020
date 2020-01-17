import React from 'react';
import { Form, Container, Button, Jumbotron } from 'react-bootstrap';

export default () => (
    <Container>
        <Jumbotron>
            <h2>Welcome to the IP Address Management tool</h2>
        </Jumbotron>
        <Form>
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
    </Container>
);