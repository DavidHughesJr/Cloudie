import { createTheme, styled } from '@mui/material/styles';
import { Colors } from '../config/colors'
import { Paper, LinearProgress, linearProgressClasses } from '@mui/material';


export const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: Colors.text,
        },
        secondary: {
            // Purple and green play nicely together.
            main: Colors.secondaryText,
        },
    },
    typography: {
        fontFamily: 'Segoe UI',
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    flexDirection: 'row',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-start',
                    fontWeight: 'bold',
                    "&.Mui-selected": {
                        "color": Colors.blue,
                    }
                }
            },
        },
    },
});

export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    width: '15rem',
    borderRadius: 20,
    marginBottom: 30,
    backgroundColor: '#2A4263',
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 20,
        backgroundColor: Colors.lightBlue
    },
}));
export const SpaceAroundPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    padding: '1rem',
    justifyContent: 'space-around',
    alignItems: 'center',
}));

