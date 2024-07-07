"use client";
import { Chip, Stack, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Refresh } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function StatsDateFilter({refresh, fd, sd}) {
    const [firstDate, setFirstDate] = useState(fd)
    const [secondDate, setSecondDate] = useState(sd)

    useEffect(() => {
        refresh(firstDate, secondDate)
    }, [firstDate, secondDate])

    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction={'row'}>
                <DatePicker format="DD-MM-YYYY" label="Fecha inicial" value={dayjs(firstDate)} onChange={(e) => setFirstDate(dayjs(e).format('YYYY-MM-DD'))} />
                <DatePicker format="DD-MM-YYYY" label="Fecha final" value={dayjs(secondDate)} onChange={(e) => setSecondDate(dayjs(e).format('YYYY-MM-DD'))} />
                <IconButton onClick={() => {
                    console.log('cambiando...')
                    // router.push('/stats?firstDate=' + firstDate + '&lastDate=' + secondDate)
                    refresh(firstDate, secondDate)
                    /*setTimeout(() => {
                        window.location.reload()
                    }, 500);*/
                }}>
                    <Refresh />
                </IconButton>
            </Stack>
            <Stack spacing={2} direction={'row'}>
                <Chip label="Este año" onClick={() => {
                    const year = dayjs().format('YYYY')
                    setFirstDate(year + '-01-01')
                    setSecondDate(year + '-12-31')
                    // refresh(firstDate, secondDate)
                }} />
                <Chip label="Este mes" onClick={() => {
                    const year = dayjs().format('YYYY')
                    const month = dayjs().format('MM')
                    setFirstDate(year + '-' + month + '-01')
                    setSecondDate(year + '-' + month + '-31')
                    // refresh(firstDate, secondDate)
                }} />
                <Chip label="Hasta este momento" />
            </Stack>
        </Stack>
    );
}
