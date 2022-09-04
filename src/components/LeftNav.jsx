import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
    MemoryRouter,
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import logo from '../img/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import StarIcon from '@mui/icons-material/Star';
import { LeftNavContainer } from '../theme/containers';

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
                <Tab icon={<DashboardIcon />} label="Dashboard" value="/" to="/" component={Link} />
                <Tab icon={<MapIcon />} label="Map" value="/map" to="/map" component={Link} />
                <Tab icon={<StarIcon />} label="Saves" value="/saves" to="/saves" component={Link} />
            </Tabs>
        </LeftNavContainer>

    );
}

