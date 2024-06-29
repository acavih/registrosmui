"use client";
import { Backdrop, LinearProgress } from "@mui/material";

export function LoadingBackdrop({ active }) {
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', backgroundColor: '#ffffff73', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={active}
            >
            </Backdrop>
            {active && <LinearProgress color="primary" />}
        </>
    );
}
