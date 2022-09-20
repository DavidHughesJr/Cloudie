import { createTheme } from '@mui/material/styles';
import { Colors } from '../helper/colors'



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
