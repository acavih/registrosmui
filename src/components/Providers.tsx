"use client"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SessionProvider } from 'next-auth/react';
import { esES } from '@mui/x-date-pickers/locales';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
                {children}
            </LocalizationProvider>
        </SessionProvider>
    )
}