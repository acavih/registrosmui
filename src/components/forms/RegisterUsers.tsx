"use client"
import { trpcClient } from "@/app/_trpc/client";
import { Card, CardContent, Grid, Typography, TextField, Button, CardActions, CardHeader } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    username: string,
    password: string
}

export default function RegisterUsers() {
    const registerApi = trpcClient.Login.register.useMutation({
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (data) => {
            console.log(data)
        }
    })

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        registerApi.mutate({
            username: data.username,
            password: data.password
        })
    }
    
    return (
        <Card component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <CardHeader title="Registrar usuario" />
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