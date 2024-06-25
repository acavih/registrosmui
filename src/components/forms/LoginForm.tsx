"use client"
import { trpcClient } from "@/app/_trpc/client";
import { Card, CardContent, Grid, TextField, Button, CardActions, CardHeader } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    username: string,
    password: string
}

export default function LoginForm() {
    const loginApi = trpcClient.Login.login.useMutation({
        onSuccess: (data) => {
            console.dir(data)
        }
    })

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        loginApi.mutate({
            username: data.username,
            password: data.password
        })
    }
    
    return (
        <Card component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <CardHeader title="Acceso a la aplicacion sds" />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField {...register("username")} label="username"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...register("password")} type="password" label="password"/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Login</Button>
                </Grid>
            </CardActions>
        </Card>
    );
}