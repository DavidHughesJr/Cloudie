import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Colors } from '../helper/colors';


export const DashboardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: "100vh",
    '*::-webkit-scrollbar': {
        width: '1px',
    },
    '*::-webkit-scrollbar-thumb': {
        backgroundColor: Colors.blue,
    },
}));
export const LeftNavContainer = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.secondaryBackground,
    width: '20%',
    height: '100vh',
    color: Colors.blue,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}));
export const MiddleContainer = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.background,
    width: '50%',
    overflow: 'scroll', 
    overflowX: 'hidden' 
}));
export const WeatherContainer = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.tertiaryBackground,
    width: '30%',
    padding: '2rem 2rem',
    overflow: 'scroll',
}));
export const ContentContainer = styled(Box)(({ theme }) => ({
    marginTop: '2rem'
}));


