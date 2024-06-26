import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import ResourceInput from '@/components/ResourceInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { trpcClient } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@mui/x-date-pickers';

type Inputs = {
    code: string
    name: string
    surname: string
    email: string
    phone: string
    sipcard: string
    notes: string
    pendent: string
    birthdate: string,

    sex: string
    nationality: string
    residency: string
    partnerState: string
    howDidKnowus: string
    yearDidKnowUs: string
}

export default function EditPartnerButton({ partner }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const router = useRouter()

    const updatePartner = trpcClient.partners.update.useMutation({
        onSuccess: () => {
            setOpen(false)
            router.refresh()
        }
    })

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            code: partner.code,
            name: partner.name,
            surname: partner.surname,
            email: partner.email,
            phone: partner.phone,
            sipcard: partner.sipcard,
            notes: partner.notes,
            pendent: partner.pendent,
            birthdate: partner.birthdate.toLocaleDateString(),
            sex: partner.sex.name,
            nationality: partner.nationality.name,
            residency: partner.residency.name,
            partnerState: partner.partnerState.name,
            howDidKnowus: partner.howDidKnowus.name,
            yearDidKnowUs: partner.yearDidKnowUs.name
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        updatePartner.mutate({
            ...data,
            id: partner.id
        })
    }

    return (
        <>
            <Button onClick={handleClickOpen} variant='contained'>
                Editar socio
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                }}
            >
                <DialogTitle>Editando socio {partner.name} {partner.surname}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField {...register("code")} label="code" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("name")} label="name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("surname")} label="surname" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("email")} label="email" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("phone")} label="phone" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("sipcard")} label="sipcard" />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker 
                                value={partner.birthdate}
                                onChange={(v) => setValue("birthdate", v!)}
                            label="birthdate" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("notes")} multiline label="notes" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("pendent")} multiline label="pendent" />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName="Sex" onChange={(v) => setValue("sex", v)} initialValue={partner.sex.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName="Nationality" onChange={(v) => setValue("nationality", v)} initialValue={partner.nationality.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName="Residency" onChange={(v) => setValue("residency", v)} initialValue={partner.residency.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName="PartnerState" onChange={(v) => setValue("partnerState", v)} initialValue={partner.partnerState.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName="HowDidKnowus" onChange={(v) => setValue("howDidKnowus", v)} initialValue={partner.howDidKnowus.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceInput resourceName="YearDidKnowus" onChange={(v) => setValue("yearDidKnowUs", v)} initialValue={partner.yearDidKnowUs.name} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant='contained'>Guardar socio</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
