import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home, Login, Racks } from './layouts';
import { NavBar, Layout } from './layouts/components';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route';

const App = ({ loggedIn }) => (
    <Router>
        {loggedIn ? <NavBar /> : null}
        <Layout>
            <Switch>
                <ProtectedRoute path="/racks" component={Racks} />
                <AuthRoute path="/login" component={Login} />
                <ProtectedRoute path="/" component={Home} />
            </Switch>
        </Layout>
    </Router>
);

const mapStateToProps = ({ firebase: { auth } }) => ({
    loggedIn: auth.uid
});

export default connect(mapStateToProps)(App);
