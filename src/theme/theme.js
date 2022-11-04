import { createTheme } from '@mui/material/styles';
import { Colors } from '../helper/colors'



export const theme = createTheme({
    palette: {
        primary: {
            main: Colors.text,
        },
        secondary: {
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
