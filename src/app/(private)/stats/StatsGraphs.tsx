import { Box, Grid, IconButton, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useRef } from "react";
import html2canvas from 'html2canvas';
import { CopyAll } from "@mui/icons-material";

const bounds = {
    width: 300,
    height: 160,
};

function GraphWrapper({ children }) {
    const ref = useRef()

    async function copy() {
        async () => {
            const elToCanvas = await html2canvas(ref.current!)
            await elToCanvas.toBlob(async (blob) => {
                await navigator.clipboard.write([
                    new ClipboardItem(Object.defineProperty({}, blob!.type, {
                        value: blob,
                        enumerable: true
                    }))
                ])
                alert('copiado')
            })
        }
    }

    return (
        <Box>
            <Stack direction={'row-reverse'} spacing={2}>
                <IconButton onClick={copy}>
                    <CopyAll />
                </IconButton>
            </Stack>
            <Box ref={ref}>
                {children}
            </Box>
        </Box>
    );
}

export default function StatsGraphs() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <GraphWrapper>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        {...bounds}
                    />
                </GraphWrapper>
            </Grid>
            <Grid item xs={4}>
                <GraphWrapper>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        {...bounds}
                    />
                </GraphWrapper>
            </Grid>
            <Grid item xs={4}>
                <GraphWrapper>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        {...bounds}
                    />
                </GraphWrapper>
            </Grid>
        </Grid>
    )
}