import { Typography, Card, CardHeader, CardContent, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import dayjs from "dayjs";

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
    {label: 'Formacion derivada', resource: 'DerivedFrom'},
    {label: 'Voluntariado derivado', resource: 'DerivedTo'},
]

export function AttentionCard({ attention }) {
    return (
        <Card>
            <CardHeader
                title={dayjs(attention.date).format('DD/MM/YYYY')} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {attention.note}
                </Typography>
                <List>
                    {resources.filter(r => attention[r.resource].length > 0) .map(r => <ListItem key={r.resource}>
                        <ListItemButton>
                            <ListItemText primary={r.label} secondary={attention[r.resource].map(type => type.name).join(', ')} />
                        </ListItemButton>
                    </ListItem>)}
                </List>
            </CardContent>
        </Card>
    );
}
