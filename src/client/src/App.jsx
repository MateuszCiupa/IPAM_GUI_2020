import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Racks } from './layouts';
import { NavBar, Layout } from './layouts/components';

export default () => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <Router>
            {loggedIn ? <NavBar /> : null}
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route 
                        path="/login"
                        render={props => <Login {...props} setLoggedIn={setLoggedIn} />}
                    />
                    <Route path="/racks" component={Racks} />
                </Switch>
            </Layout>
        </Router>
    );
};
