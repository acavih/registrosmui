import { trpcClient } from "@/app/_trpc/client";
import ResourceInput from "@/components/ResourceInput";
import ResourceInputMultiple from "@/components/ResourceInputMultiple";
import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    note: string
    date: string
    pendent: string
    pendentDate: string
    placeAttention: string
    typeAttentions: string[]
    projects: string[]
    attentionsReasons: string[]
    derivedTo: string[]
    derivedFrom: string[]
    formation: string[]
    volunteer: string[]
}

export default function EditAttention({attention}: {attention: Inputs & {partner: {name: string, surname: string}}}) {
    const editAttention = trpcClient.attentions.editAttention.useMutation()
    const [active, setActive] = useState(false)

    const handleClose = () => {
        setActive(false)
    }

    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        editAttention.mutate({
            ...data,
        })
    }

    useEffect(() => {
        setValue('note', attention.note)
    }, [attention])

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setActive(true)}>
                Editar atención
            </Button>
            <Dialog
                fullWidth={true}
                open={active}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                }}
            >
                <DialogTitle>Editar atención ({attention.partner.name} {attention.partner.surname})</DialogTitle>
                <DialogContent>
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
                        <Grid item xs={12}>
                            <DatePicker
                                onChange={(v) => setValue("pendentDate", dayjs(v).format('YYYY/MM/DD'))}
                                label="Fecha cosas pendientes" />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='typeattentions' onChange={(v: any) => setValue("typeAttentions", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='projects' onChange={(v: any) => setValue("projects", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='attentionsreasons' onChange={(v: any) => setValue("attentionsReasons", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='derivedto' onChange={(v: any) => setValue("derivedTo", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='derivedfrom' onChange={(v: any) => setValue("derivedFrom", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='formation' onChange={(v: any) => setValue("formation", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='volunteer' onChange={(v: any) => setValue("volunteer", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName='placeattentions' onChange={(v) => setValue("placeAttention", v)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={editAttention.isLoading} type="submit" variant='contained'>Guardar cambios</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}