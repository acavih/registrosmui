import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';
import { Card, CardActions, CardContent, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import ResourceInput from '@/components/ResourceInput';
import ResourceInputMultiple from '@/components/ResourceInputMultiple';
import { trpcClient } from '@/app/_trpc/client';

export default function AddAttention({partnerId}) {
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Añadir atención
            </Button>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Añadir atención</DialogTitle>
                <DialogContent>
                    <AddAttentionForm partnerId={partnerId} handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

type Inputs = {
    note: string
    date: string
    pendent: string
    placeAttention: string
    typeAttentions: string[]
}

function AddAttentionForm({handleClose, partnerId}) {
    const addAttention = trpcClient.attentions.createAttention.useMutation({
        onSuccess() {
            router.refresh()
            console.log('submit')
            handleClose()
        }
    })
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        addAttention.mutate({
            ...data,
            partnerId
        })
    }

    return (
        <Card component={'form'} method="post" elevation={0} onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField multiline label="Observaciones" {...register('note')} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField multiline label="Cosas pendientes" {...register('pendent')} />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            onChange={(v) => setValue("date", dayjs(v).format('YYYY/MM/DD'))}
                            label="Fecha de atención" />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <DatePicker
                            onChange={(v) => setValue("pendent", dayjs(v).format('YYYY/MM/DD'))}
                            label="Pendiente" />
                    </Grid> */}
                    <Grid item xs={12}>
                        <ResourceInputMultiple multiple={true} resourceName='typeattentions' onChange={(v: any) => setValue("typeAttentions", v)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName='placeattentions' onChange={(v) => setValue("placeAttention", v)} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Añadir atención</Button>
            </CardActions>
        </Card>
    )
}
