"use client";
import { Chip, Stack, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Refresh } from "@mui/icons-material";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function StatsDateFilter() {
    const router = useRouter()
    const params = useSearchParams()

    const [firstDate, setFirstDate] = useState(params.get('firstDate'))
    const [secondDate, setSecondDate] = useState(params.get('lastDate'))
    
    function refresh() {
        console.log('cambiando...')
        router.push('/stats?firstDate=' + firstDate + '&lastDate=' + secondDate)
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }

    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction={'row'}>
                <DatePicker format="DD-MM-YYYY" label="Fecha inicial" value={dayjs(firstDate)} onChange={(e) => setFirstDate(dayjs(e).format('YYYY-MM-DD'))} />
                <DatePicker format="DD-MM-YYYY" label="Fecha final" value={dayjs(secondDate)} onChange={(e) => setSecondDate(dayjs(e).format('YYYY-MM-DD'))} />
                <IconButton onClick={refresh}>
                    <Refresh />
                </IconButton>
            </Stack>
            <Stack spacing={2} direction={'row'}>
                <Chip label="Este año" />
                <Chip label="Este mes" />
                <Chip label="Hasta este momento" />
            </Stack>
        </Stack>
    );
}
