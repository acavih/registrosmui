"use client";
import { Box, Container, ThemeProvider, Toolbar } from "@mui/material";
import MyAppBar from "./Navbar";
import MyDrawer, { drawerWidth } from "./MyDrawer";
import { useState } from "react";
import { theme } from "@/theme";
import Providers from "../Providers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <Providers>
            <ThemeProvider theme={theme}>
                <MyDrawer open={open} />
                <MyAppBar toggleDrawer={() => setOpen(!open)} />
                <Box component={"main"} sx={{ pl: open ? `calc(20px + ${drawerWidth}px)` : 0 }} >
                    <Toolbar />
                    <Container maxWidth={false} sx={{ mt: 4, px: 2, mb: 20 }}>
                        {children}
                    </Container>
                </Box>
            </ThemeProvider>
        </Providers>
    )
}