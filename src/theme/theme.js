import { createTheme, styled } from '@mui/material/styles';
import { Colors } from '../config/colors'
import { LinearProgress, linearProgressClasses } from '@mui/material';


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
                    fontWeight: 'bold'
                },
                selected: {
                    backgroundColor: 'blue',
                    color: 'blue',
                    "&:hover": {
                        backgroundColor: 'blue',
                        color: 'blue'
                    }
                }
            },
        },
    },
});

export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: Colors,
    [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    backgroundColor: Colors.lightBlue
},
}));