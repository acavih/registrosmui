"use client"
import { trpcClient } from "@/app/_trpc/client";
import ResourceInput from "@/components/ResourceInput";
import { Card, CardContent, Grid, TextField, Button, CardActions, CardHeader } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
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

export default function AddPartnerForm({close}) {
    const router = useRouter()
    const addPartner = trpcClient.partners.create.useMutation({
        onSuccess() {
            router.refresh()
            close()
        }
    })

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        addPartner.mutate({
            ...data
        })
    }

    return (
        <Card component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <CardHeader title="Añadir socio" />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField {...register("code")} label="code"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("name")} label="name"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("surname")} label="surname"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("email")} label="email"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("phone")} label="phone"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("sipcard")} label="sipcard"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            onChange={(v) => setValue("birthdate", dayjs(v).format('YYYY/MM/DD'))}
                            label="birthdate" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("notes")} multiline label="notes"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("pendent")} multiline label="pendent"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName="sex" onChange={(v) => setValue("sex", v)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName="nationalities" onChange={(v) => setValue("nationality", v)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName="residencies" onChange={(v) => setValue("residency", v)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName="partnerstates" onChange={(v) => setValue("partnerState", v)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName="howdidknowus" onChange={(v) => setValue("howDidKnowus", v)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceInput resourceName="yeardidknowus" onChange={(v) => setValue("yearDidKnowUs", v)} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Añadir socio</Button>
                </Grid>
            </CardActions>
        </Card>
    )
}