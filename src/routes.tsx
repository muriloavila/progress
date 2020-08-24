import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './config/privateRoute';
import Edit from './pages/Edit';
import Home from './pages/Home';
import List from './pages/List';
import Login from './pages/Login';
import New from './pages/New';
import Random from './pages/Random';
export default function Routes() {
    return (
        <BrowserRouter>
            
            <Switch>
                <Route exact path='/' component={Login} />
                <PrivateRoute path='/home' component={Home} />
                <PrivateRoute path='/list' component={List} />
                <PrivateRoute path='/new' component={New} />
                <PrivateRoute path='/edit' component={Edit} />
                <PrivateRoute path='/random' component={Random} />
            </Switch>
        </BrowserRouter>
    );
}