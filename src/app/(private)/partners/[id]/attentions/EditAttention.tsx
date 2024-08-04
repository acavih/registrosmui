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
    PlaceAttention: string
    TypeAttentions: string[]
    Projects: string[]
    AttentionsReasons: string[]
    DerivedTo: string[]
    DerivedFrom: string[]
    Formation: string[]
    Volunteer: string[]
}

export default function EditAttention({attention}) {
    const editAttention = trpcClient.attentions.editAttention.useMutation()
    const [active, setActive] = useState(false)

    const handleClose = () => {
        setActive(false)
    }
    console.log(attention)

    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            note: attention.note,
            /*date: attention.date,
            pendent: attention.pendent,
            pendentDate: attention.pendentDate,*/
            PlaceAttention: attention.PlaceAttention.name,
            /*TypeAttentions: attention.TypeAttentions,
            Projects: attention.Projects,
            AttentionsReasons: attention.AttentionsReasons,
            DerivedTo: attention.DerivedTo,
            DerivedFrom: attention.DerivedFrom,
            Formation: attention.Formation,
            Volunteer: attention.Volunteer*/
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('RESULT', data)
        /*editAttention.mutate({
            ...data,
        })*/
    }

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
                            <ResourceInput label="Lugar de atención" resourceName='placeattentions' onChange={(v) => setValue("PlaceAttention", v)} initialValue={attention.PlaceAttention.name} />
                        </Grid>
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
                            <ResourceInputMultiple multiple={true} resourceName='typeattentions' onChange={(v: any) => setValue("TypeAttentions", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='projects' onChange={(v: any) => setValue("Projects", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='attentionsreasons' onChange={(v: any) => setValue("AttentionsReasons", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='derivedto' onChange={(v: any) => setValue("DerivedTo", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='derivedfrom' onChange={(v: any) => setValue("DerivedFrom", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='formation' onChange={(v: any) => setValue("Formation", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple multiple={true} resourceName='volunteer' onChange={(v: any) => setValue("Volunteer", v)} />
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