import { createTheme, ThemeProvider } from '@mui/material/styles'

// Crea un tema personalizado
export const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true
            }
        }
    }
});
