import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home, Login, Racks } from './layouts';
import { NavBar, Layout, TableWrapper, CardWrapper, TableDetailsWrapper } from './layouts/components';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route';
import { collections } from './util/firebase';
import 'App.css'

const App = ({ loggedIn }) => (
    <Router>
        {loggedIn ? <NavBar /> : null}
        <Layout>
            <Switch>
                <AuthRoute path="/login" component={Login} />

                {Object.keys(collections).map(colName => collections[colName].tableFields ? (
                    <ProtectedRoute 
                        key={colName+'table'}
                        exact
                        path={`/${colName}`}
                        component={TableWrapper}
                        collectionName={colName}
                    />
                ) : null)}

                {Object.keys(collections).map(colName => (
                    <ProtectedRoute
                        key={colName+'card'}
                        exact
                        path={`/${colName}/:documentId`}
                        component={colName === "racks" ? TableWrapper : TableDetailsWrapper}
                        collectionName={colName}
                    />
                ))}

                <ProtectedRoute 
                    exact 
                    path="/" 
                    component={Home}
                />
            </Switch>
        </Layout>
    </Router>
);

const mapStateToProps = ({ firebase: { auth } }) => ({
    loggedIn: auth.uid
});

export default connect(mapStateToProps)(App);
