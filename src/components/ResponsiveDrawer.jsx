import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
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
import {Colors} from '../config/colors'


const drawerWidth = 240;


function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
    
    const routeMatch = useRouteMatch(['/', '/map', '/saves']);
    const currentTab = routeMatch?.pattern?.path;

    const drawer = (
        
        <div>
            <Toolbar />
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
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    

    return (
        <Box sx={{ display: 'flex', background: Colors.secondaryBackground }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)`, },
                    ml: { sm: `${drawerWidth}px`, },
                    display: { md: 'none'},
                }}
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
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                <Box
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Box>
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;
