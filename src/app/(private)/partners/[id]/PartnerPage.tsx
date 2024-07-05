"use client"
import { Box, Card, CardContent, CardHeader, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import EditPartnerButton from "./EditPartnerButton";
import calcularEdad from "@/utils/calcularEdad";
import dayjs from "dayjs";
import AttentionsSection from "./attentions";

export default function PartnerPage({data, attentions, partnerId}) {
    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Stack justifyContent={'space-between'} direction={'row'} spacing={2}>
                    <Typography variant="h4" color="initial">{data.name} {data.surname}</Typography>
                    <Stack direction={'row'} spacing={2}>
                        <EditPartnerButton partner={data} />
                    </Stack>
                </Stack>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell width={'180px'} component={"th"}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}} color="initial">Tarjeta SIP</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="initial">{data.sipcard}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={'180px'}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}} color="initial">Sexo</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="initial">{data.sex.name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={'180px'}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}} color="initial">Nacionalidad</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="initial">{data.nationality.name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={'180px'}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}} color="initial">Residencia</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="initial">{data.residency.name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={'180px'}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}} color="initial">Estado</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="initial">{data.partnerState.name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={'180px'}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}} color="initial">Fecha de nacimiento</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="initial">
                                        {data.birthdate ? (
                                            <span>
                                                {dayjs(data.birthdate).format('DD/MM/YYYY')} ({calcularEdad(new Date(data.birthdate))} años)
                                            </span>
                                        ) : 'N/A'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {data.notes && <Card variant="outlined">
                    <CardHeader title="Observaciones" />
                    <CardContent>
                        <Typography variant="body1" color="initial">{data.notes}</Typography>
                    </CardContent>
                </Card>}
                {data.pendent && <Card variant="outlined">
                    <CardHeader title="Pendiente" />
                    <CardContent>
                        <Typography variant="body1" color="initial">{data.pendent}</Typography>
                    </CardContent>
                </Card>}
                <AttentionsSection partnerId={partnerId} attentions={attentions} />
            </Stack>
        </Box>
    )
}