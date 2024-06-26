"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PartnersTable from "./PartnersTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddPartnerButton from "./AddPartnerButton";


export function PartnersPage({partners, searchQuery}) {
    const router = useRouter()
    const [search, setSearch] = useState(searchQuery)

    useEffect(() => {
        router.push(`/partners?search=${search}`)
    }, [search])

    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Stack justifyContent={'space-between'} direction={'row'} spacing={2}>
                    <Typography variant="h5" color="initial">Listado de socios</Typography>
                    <Stack direction={'row'} spacing={2}>
                        <AddPartnerButton />
                    </Stack>
                </Stack>
                <TextField value={search} onChange={(e) => setSearch(e.target.value)} label={'Buscar socio'} />
                <PartnersTable {...{partners}} />
            </Stack>
        </Box>
    )
}