import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signIn } from 'redux/modules/auth';

const Login = ({ loading, error, signIn }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        if (error) setShowAlert(true);
    }, [error]);

    const handleSubmit = event => {
        event.preventDefault();
        signIn({ email, password });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="formBasicLogin" md={{ span: 3, offset: 4 }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        as="input" 
                        size="sm" 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formBasicPassword" md={{ span: 3, offset: 4 }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        as="input" 
                        size="sm" 
                        type="password" 
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md={{ offset: 4 }}>
                    <Button type="submit" size="sm" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign in'}
                    </Button>
                </Form.Group>
            </Form.Row>
            <Row>
                <Col md={{ span: 3, offset: 4 }}>
                    <Alert 
                        variant="danger" 
                        show={showAlert}
                    >
                        {error}
                    </Alert>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = ({ auth: { loading, error } }) => ({
    loading,
    error
});

const mapDispatchToProps = dispatch => ({
    signIn: user => dispatch(signIn(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);