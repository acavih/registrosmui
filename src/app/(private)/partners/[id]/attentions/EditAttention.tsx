import { trpcClient } from "@/app/_trpc/client";
import ResourceInput from "@/components/ResourceInput";
import ResourceInputMultiple from "@/components/ResourceInputMultiple";
import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
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
    if (attention.id === "3e4cc681-8aa6-4ca5-b105-82c75ccac445") {
        console.log('EDIT ATTENTION', attention)
    }

    const router = useRouter()
    const params = useParams()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            note: attention.note,
            AttentionsReasons: attention.AttentionsReasons,
            date: attention.date,
            DerivedFrom: attention.DerivedFrom,
            DerivedTo: attention.DerivedTo,
            Formation: attention.Formation,
            pendent: attention.pendent,
            pendentDate: attention.pendentDate,
            PlaceAttention: attention.PlaceAttention,
            Projects: attention.Projects,
            TypeAttentions: attention.TypeAttentions,
            Volunteer: attention.Volunteer
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log('RESULT', data)
        await editAttention.mutateAsync({
            ...data,
            id: attention.id as string
        })
        setActive(false)
        router.refresh()
    }

    return (
        <>
            <Button disableElevation variant="contained" color="primary" onClick={() => setActive(true)}>
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
                            <TextField defaultValue={attention.note} multiline label="Observaciones" {...register('note')} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField defaultValue={attention.pendent} multiline label="Cosas pendientes" {...register('pendent')} />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker defaultValue={dayjs(attention.date)}
                                onChange={(v) => setValue("date", dayjs(v).format('YYYY/MM/DD'))}
                                label="Fecha de atención" />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker defaultValue={dayjs(attention.pendentDate)}
                                onChange={(v) => setValue("pendentDate", dayjs(v).format('YYYY/MM/DD'))}
                                label="Fecha cosas pendientes" />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Tipos de atención'} initialValue={attention.TypeAttentions} multiple={true} resourceName='typeattentions' onChange={(v: any) => setValue("TypeAttentions", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Proyectos'} initialValue={attention.Projects} multiple={true} resourceName='projects' onChange={(v: any) => setValue("Projects", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Motivos de atención'} initialValue={attention.AttentionsReasons} multiple={true} resourceName='attentionsreasons' onChange={(v: any) => setValue("AttentionsReasons", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Derivado a'} initialValue={attention.DerivedTo} multiple={true} resourceName='derivedto' onChange={(v: any) => setValue("DerivedTo", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Derivado de'} initialValue={attention.DerivedFrom} multiple={true} resourceName='derivedfrom' onChange={(v: any) => setValue("DerivedFrom", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Formación'} initialValue={attention.Formation} multiple={true} resourceName='formation' onChange={(v: any) => setValue("Formation", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInputMultiple label={'Voluntariado'} initialValue={attention.Volunteer} multiple={true} resourceName='volunteer' onChange={(v: any) => setValue("Volunteer", v)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput label={'Lugar de atención'} resourceName='placeattentions' onChange={(v) => setValue("PlaceAttention", v)} initialValue={attention.PlaceAttention} />
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