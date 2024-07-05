import { Stack, Typography, Button } from "@mui/material";

export default function StatsHeader({partners, attentions}) {
    return (
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
            <Typography variant="h5" color="initial">Estadísticas</Typography>
            <Stack spacing={2} direction={'row'}>
                <Button variant="contained" color="primary">
                    Atenciones ({attentions.length})
                </Button>
                <Button variant="contained" color="primary">
                    Socios ({partners.length})
                </Button>
            </Stack>
        </Stack>
    )
}