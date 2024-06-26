"use client";
import { Box, Container, ThemeProvider, Toolbar } from "@mui/material";
import MyAppBar from "./Navbar";
import MyDrawer, { drawerWidth } from "./MyDrawer";
import { useState } from "react";
import { theme } from "@/theme";
import Providers from "../Providers";
import MyAppBarGuest from "./NavbarGuest";

export default function AppLayoutGuest({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <ThemeProvider theme={theme}>
                <Box component={"main"}>
                    <MyAppBarGuest />
                    <Toolbar />
                    <Container maxWidth={false} sx={{ mt: 4, px: 2 }}>
                        {children}
                    </Container>
                </Box>
            </ThemeProvider>
        </Providers>
    )
}