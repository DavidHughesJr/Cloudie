import * as React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter, Link, matchPath, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { AppBar, Box, Divider, Drawer, IconButton, List, Toolbar, Tabs, Tab, Typography } from '@mui/material';
import { Menu, Dashboard, Star, Map } from '@mui/icons-material'
import logo from '../img/logo.png'


const drawerWidth = 240;


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


function TopNav(props) {
    const routeMatch = useRouteMatch(['/', '/map', '/saves']);
    const currentTab = routeMatch?.pattern?.path;
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <img src={logo} alt="logo" />
            <Divider />
            <List>
                <Tabs
                    value={currentTab}
                    orientation="vertical"
                    indicatorColor=''
                >
                    <Tab icon={<Dashboard />} label="Dashboard" value="/" to="/" component={Link} />
                    <Tab icon={<Map />} label="Map" value="/map" to="/map" component={Link} />
                    <Tab icon={<Star />} label="Saves" value="/saves" to="/saves" component={Link} />
                </Tabs>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{
            display: { sm: 'none' }
        }}>
            <AppBar component="nav"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>

                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Toolbar />
        </Box>
    );
}

export default TopNav;
