"use client"

import { Box, Grid, Stack } from "@mui/material"
import StatsHeader from "./StatsHeader"
import StatsGraphs from "./StatsGraphs"
import { StatsDateFilter } from "./StatsDateFilter"
import { StatsFilter } from "./StatsFilter"
import { useEffect, useState } from "react"

export default function StatsPage({partners, attentions, refresh, fd, sd}) {
    const [filteredAttentions, setFilteredAttentions] = useState<any[]>([])
    const [filteredPartners, setFilteredPartners] = useState<any[]>([])
    
    useEffect(() => {
        setFilteredAttentions(attentions)
        setFilteredPartners(partners)
    }, [partners, attentions])

    return (
        <Box>
            <StatsHeader {...{partners: filteredPartners, attentions: filteredAttentions}} />
            <Grid sx={{ mt: 2 }} container spacing={2}>
                <Grid item xs={9}>
                    <Stack spacing={2}>
                        <StatsDateFilter fd={fd} sd={sd} refresh={refresh} />
                        <StatsGraphs filteredPartners={filteredPartners} />
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <StatsFilter />
                </Grid>
            </Grid>
        </Box>
    )
}
