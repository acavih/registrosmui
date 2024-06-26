"use client"
import { Card, CardContent, Grid, TextField, Button, CardActions, CardHeader } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    username: string,
    password: string
}

export default function LoginForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await signIn("credentials", {
                username: data.username.trim(),
                password: data.password.trim(),
                redirect: false
            })
            router.refresh()
        } catch (error) {
            console.log(error)
            console.log('error autenticandose')
        }
    }
    
    return (
        <Card component={'form'} method="post" onSubmit={handleSubmit(onSubmit)}>
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