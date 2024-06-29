"use client"
import { Card, CardContent, Grid, TextField, Button, CardActions, CardHeader, Alert, CircularProgress, Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingBackdrop } from "../LoadingBackdrop";

type Inputs = {
    username: string,
    password: string
}

export default function LoginForm() {
    const [msg, setMsg] = useState('')
    const [unable, setUnable] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setMsg('')
            setUnable(true)
            const result = await signIn("credentials", {
                username: data.username.trim(),
                password: data.password.trim(),
                redirect: false
            })

            if (!result?.ok) {
                console.dir(result)
                console.log('error autenticandose')
                setMsg(result!.error ?? 'Hubo un error interno')
                setUnable(false)
                return
            }
            router.refresh()
        } catch (error) {
            setMsg('Hubo un error interno')
            console.log(error)
            console.log('error autenticandose')
            setUnable(false)
        }
    }

    return (
        <Card component={'form'} sx={{ position: 'relative' }} method="post" onSubmit={handleSubmit(onSubmit)}>
            <LoadingBackdrop active={unable} />
            <CardHeader title="Acceso a la aplicacion" />
            <CardContent>
                {msg && <Alert sx={{ mb: 2 }} severity="error">{msg}</Alert>}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField {...register("username")} label="username" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("password")} type="password" label="password" />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Stack sx={{ width: '100%' }} justifyContent={'flex-end'} direction={'row'} spacing={2}>
                    <Button disableElevation type="submit" variant="contained">Login</Button>
                </Stack>
            </CardActions>
        </Card>
    );
}

