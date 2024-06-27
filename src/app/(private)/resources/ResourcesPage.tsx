"use client"
import { List, ListItem, ListItemButton, ListItemText, Box, Stack, Typography, Button, Select, Grid } from "@mui/material";
import AddResourceButton from "./AddResourceButton";
import EditResourceButton from "./EditResourceButton";
import Link from "next/link";

export default function ResourcesPage({ resources, isError = false, type }) {
    const resourceTypes = [
        {type: 'sex', label: 'Sexo'},
        {type: 'residencies', label: 'Residencia'},
        {type: 'nationalities', label: 'Nacionalidades'},
        {type: 'yeardidknowus', label: 'Año en que nos conoció'},
        {type: 'attentionsreasons', label: 'Razón de atenciones'},
        {type: 'howdidknowus', label: 'Como nos conoció'},
        {type: 'derivedfrom', label: 'Derviado de'},
        {type: 'derivedto', label: 'Derviado a'},
        {type: 'formation', label: 'Formación'},
        {type: 'placeattentions', label: 'Lugares de atención'},
        {type: 'projects', label: 'Proyectos'},
        {type: 'typeattentions', label: 'Tipos de atenciones'},
        {type: 'volunteer', label: 'Voluntariado'},
    ].sort((a, b) => a.label.localeCompare(b.label))
    
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                    <Stack direction={'column'} spacing={2}>
                        <Stack justifyContent={'space-between'} direction={'row'} spacing={2}>
                            <Typography variant="h5" color="initial">Recursos</Typography>
                            {!isError && <Stack direction={'row'} spacing={2}>
                                <AddResourceButton type={type} />
                            </Stack>}
                        </Stack>
                        <List>
                            {resources.map(r => (
                                <ListItem key={r.id} secondaryAction={<EditResourceButton type={type} r={r} />}>
                                    <ListItemButton>
                                        <ListItemText primary={r.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </Grid>
                <Grid xs={12} md={2} item>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="initial">Tipos de recursos</Typography>
                    <List dense>
                        {resourceTypes.map(r => <ListItem key={r.type}>
                            <ListItemButton  component={Link} href={"/resources?type=" + r.type} selected={type === r.type}>
                                <ListItemText primary={r.label} />
                            </ListItemButton>
                        </ListItem>)}
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}