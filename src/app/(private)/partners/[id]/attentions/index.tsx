import { Box, Stack, Typography, Button } from "@mui/material";
import AddAttention from "./AddAttention";
import { AttentionCard } from "./AttentionCard";

export default function AttentionsSection({attentions, partnerId}) {
    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Stack justifyContent={'space-between'} direction={'row'} spacing={2}>
                    <Typography variant="h5" color="initial">Atenciones</Typography>
                    <Stack direction={'row'} spacing={2}>
                        <AddAttention partnerId={partnerId} />
                    </Stack>
                </Stack>
                <Stack direction={'column'} spacing={2}>
                    {attentions.map(attention => {
                        const a = {
                            ...attention,
                            PlaceAttention: attention.PlaceAttention
                        }
                        return <AttentionCard key={attention.id} attention={a} />
                    })}
                </Stack>
            </Stack>
        </Box>
    )
}
