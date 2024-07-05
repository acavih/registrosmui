"use client"

import { Box, Grid, Stack } from "@mui/material"
import StatsHeader from "./StatsHeader"
import StatsGraphs from "./StatsGraphs"
import { StatsDateFilter } from "./StatsDateFilter"
import { StatsFilter } from "./StatsFilter"
import { useState } from "react"

export default function StatsPage({partners, attentions}) {
    const [filteredAttentions, setFilteredAttentions] = useState(attentions)
    const [filteredPartners, setFilteredPartners] = useState(partners)

    return (
        <Box>
            <StatsHeader {...{partners: filteredPartners, attentions: filteredAttentions}} />
            <Grid sx={{ mt: 2 }} container spacing={2}>
                <Grid item xs={9}>
                    <Stack spacing={2}>
                        <StatsDateFilter />
                        <StatsGraphs />
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <StatsFilter />
                </Grid>
            </Grid>
        </Box>
    )
}