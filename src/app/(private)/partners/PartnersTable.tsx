import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge, Card, CardContent, CardHeader, Grid, IconButton, Stack } from '@mui/material';
import { Button } from '@mui/material';

import { ArrowDropDown as DownIcon, ArrowDropUp as UpIcon, Circle, ReportProblem } from '@mui/icons-material'
import { wrap } from 'module';
import { useRouter } from 'next/navigation';

export default function PartnersTable({partners}) {
  return (
    <TableContainer component={Paper}>
      <Table size='small' sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell size={'small'}></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Tarjeta sip</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell align='right'>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partners.map((row) => <PartnerRow row={row} key={row.id} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PartnerRow({row}) {
    const [showAditionalRow, setShowAditionalRow] = React.useState(false)
    const router = useRouter()

    const invisible = row.notes.length === 0 && row.pendent.length === 0

    const expandButton = (
        <IconButton onClick={() => setShowAditionalRow(!showAditionalRow)}>
            {showAditionalRow ? <UpIcon /> : <DownIcon />}
        </IconButton>
    )

    return (
        <>
            <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell size={'small'} scope="row">{!invisible && expandButton}</TableCell>
                <TableCell scope="row">{row.name}</TableCell>
                <TableCell scope="row">{row.surname}</TableCell>
                <TableCell scope="row">{row.sipcard}</TableCell>
                <TableCell scope="row">{row.sex}</TableCell>
                <TableCell scope="row" align='right'>
                    <Stack justifyContent={'flex-end'} direction='row' spacing={2}>
                        <Button disableElevation size='small' variant="contained"
                            onClick={() => router.push(`/partners/${row.id}`)}
                        >
                            Ver socio
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
            {showAditionalRow && <TableRow>
                <TableCell colSpan={6}>
                    <Stack direction='column' spacing={2}>
                        {row.notes.length > 0 && <Card variant='outlined'>
                            <CardHeader title="Observaciones" />
                            <CardContent>
                                <p>{row.notes}</p>
                            </CardContent>
                        </Card>}
                        {row.pendent.length > 0 && <Card variant='outlined'>
                            <CardHeader title="Pendiente" />
                            <CardContent>
                                <p>{row.pendent}</p>
                            </CardContent>
                        </Card>}
                    </Stack>
                </TableCell>
            </TableRow>}
        </>
    )
}
