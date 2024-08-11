import { Typography, Card, CardHeader, CardContent, List, ListItem, ListItemButton, ListItemText, Box, Alert, Stack } from "@mui/material";
import dayjs from "dayjs";
import EditAttention from "./EditAttention";

/**
 * TypeAttentions: true,
          PlaceAttention: true,
          Projects: true,
          AttentionsReasons: true,
          DerivedFrom: true,
          DerivedTo: true,
          Formation: true,
          Volunteer: true
 */

const resources = [
    {label: 'Tipos de atencion', resource: 'TypeAttentions'},
    {label: 'Proyectos', resource: 'Projects'},
    {label: 'Motivos de atencion', resource: 'AttentionsReasons'},
    {label: 'Formacion', resource: 'Formation'},
    {label: 'Voluntariado', resource: 'Volunteer'},
    {label: 'Derivado de', resource: 'DerivedFrom'},
    {label: 'Derivado a', resource: 'DerivedTo'},
]

export function AttentionCard({ attention }) {
    return (
        <Card>
            <CardHeader title={
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>{dayjs(attention.date).format('DD/MM/YYYY')}</span>
                    <EditAttention attention={attention} />
                </Box>
            } />
            <CardContent>
                <Stack direction={'column'} gap={1}>
                    {attention.pendent && (<Alert severity="info">{attention.pendent} {dayjs(attention.pendentDate).format('DD/MM/YYYY')}</Alert>)}
                    {attention.note && (<Alert severity="info">{attention.note}</Alert>)}
                </Stack>
                <List>
                    {resources.filter(r => attention[r.resource].length > 0).map(r => (
                        <ListItem key={r.resource}>
                            <ListItemButton>
                                <ListItemText primary={r.label} secondary={attention[r.resource].map(type => type.name).join(', ')} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
