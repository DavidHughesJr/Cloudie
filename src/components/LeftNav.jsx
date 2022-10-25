import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@mui/material'
import { MemoryRouter, Link, matchPath, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Dashboard, Map, Star } from '@mui/icons-material'
import { LeftNavContainer } from '../theme/styled';
import logo from '../img/logo.png'

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export default function LeftNav() {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/', '/map', '/saves']);
    const currentTab = routeMatch?.pattern?.path;


    return (

        <LeftNavContainer>
            <div className='nav-img'> <img src={logo} alt="logo" /></div>
            <Tabs
                value={currentTab}
                orientation="vertical"
                indicatorColor=''
            >
                <Tab icon={<Dashboard />} label="Dashboard" value="/" to="/" component={Link} />
                <Tab icon={<Map />} label="Map" value="/map" to="/map" component={Link} />
                <Tab icon={<Star />} label="Saves" value="/saves" to="/saves" component={Link} />
            </Tabs>
        </LeftNavContainer>

    );
}

