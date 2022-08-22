import { createTheme } from '@mui/material/styles';
import { Colors } from '../config/colors'


export const navTheme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: Colors.blue,
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    flexDirection: 'row',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-start',
                    marginLeft: '1rem',
                    fontWeight: 'bold'
                },
            },
        },
    },
});
