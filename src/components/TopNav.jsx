import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <Tabs
                    value={currentTab}
                    orientation="vertical"
                    indicatorColor=''
                >
                    <Tab icon={<DashboardIcon />} label="Dashboard" value="/" to="/" component={Link} />
                    <Tab icon={<MapIcon />} label="Map" value="/map" to="/map" component={Link} />
                    <Tab icon={<StarIcon />} label="Saves" value="/saves" to="/saves" component={Link} />
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
                        <MenuIcon />
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
