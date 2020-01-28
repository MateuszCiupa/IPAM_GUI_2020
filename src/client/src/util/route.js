import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const Auth = ({ loggedIn, path, exact, component: Component }) => (
    <Route
        path={path}
        exact={exact}
        render={props => 
            loggedIn ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        } 
    />
);

const Protected = ({ loggedIn, path, exact, component: Component, collectionName }) => (
    <Route 
        path={path}
        exact={exact}
        render={props => 
            loggedIn ? (
                <Component {...props} collectionName={collectionName} />
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