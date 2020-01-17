import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login } from './layouts';
import { NavBar } from './layouts/components';

export default () => {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <Router>
            {loggedIn ? <NavBar /> : null}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
};
