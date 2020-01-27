import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const Auth = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={props => 
            loggedIn ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        } 
    />
);

const Protected = ({ loggedIn, path, component: Component }) => (
    <Route 
        path={path}
        render={props => 
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const mapStateToProps = ({ firebase: { auth } }) => ({
    loggedIn: auth.uid
});

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);