import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Colors } from '../config/colors';


export const DashboardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
}));
export const LeftNavContainer = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.secondaryBackground,
    width: '20%',
    color: Colors.blue,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}));
export const MiddleContainer = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.background,
    width: '50%',
    padding: '1rem 2rem',

}));
export const WeatherContainer = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.tertiaryBackground,
    width: '30%',
    padding: '1rem 2rem'
}));
export const ContentContainer = styled(Box)(({ theme }) => ({
    marginTop: '2rem'
}));


