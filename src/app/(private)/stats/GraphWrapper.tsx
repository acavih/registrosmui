import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useRef } from "react";
import html2canvas from 'html2canvas';
import { CopyAll } from "@mui/icons-material";

export default function GraphWrapper({ children, title = 'Gráfica sin título' }) {
    const ref = useRef()

    async function copy() {
        const elToCanvas = await html2canvas(ref.current!)
        await elToCanvas.toBlob(async (blob) => {
            await navigator.clipboard.write([
                new ClipboardItem(Object.defineProperty({}, blob!.type, {
                    value: blob,
                    enumerable: true
                }))
            ])
        })
    }

    return (
        <Box>
            <Stack direction={'row-reverse'} spacing={2}>
                <IconButton onClick={copy}>
                    <CopyAll />
                </IconButton>
            </Stack>
            <Box ref={ref}>
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        {children}
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}