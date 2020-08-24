import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import isAuthorize from './authorization';


interface PrivateRouteProps extends RouteProps {
    component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    return (<Route {... rest} render={props => (
        isAuthorize() ?
            (
                <Component {...props} />
            )
        :
            (
                <Redirect to={{pathname: '/', state: { from: props.location }}} />
            )
    )} />)
}

export default PrivateRoute;