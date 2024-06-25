import { prismaClient } from "@/utils/prismaClient";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";

export const loginRouter = router({
    login: publicProcedure.input(
        z.object({
            username: z.string(),
            password: z.string(),
        })
    ).mutation(async ({ input }) => {
        const existingUser = await prismaClient.user.findFirst({
            where: {
                username: input.username
            }
        })

        if (!existingUser) {
            throw new TRPCError({code: 'NOT_FOUND', message: 'El usuario no existe'})
        }

        const passwordMatch = await bcrypt.compare(input.password, existingUser.password)

        if (!passwordMatch) {
            throw new TRPCError({code: 'UNAUTHORIZED', message: 'La contraseña es incorrecta'})
        }

        console.log(existingUser)

        const {password, ...user} = existingUser
        
        return {msg: 'Exito', data: user}
    }),
    register: publicProcedure.input(
        z.object({
            username: z.string(),
            password: z.string(),
        })
    ).mutation(async ({ input }) => {
        if (!input.username) {
            throw new TRPCError({code: 'BAD_REQUEST', message: 'El nombre de usuario es requerido'})
        }

        if (!input.password) {
            throw new TRPCError({code: 'BAD_REQUEST', message: 'La contraseña es requerida'})
        }

        const existingUser = await prismaClient.user.findFirst({
            where: {
                username: input.username
            }
        })

        if (existingUser) {
            throw new TRPCError({code: 'CONFLICT', message: 'El usuario ya existe'})
        }

        const encryptedPassword = await bcrypt.hash(input.password, 10)
        const user = await prismaClient.user.create({
            data: {
                username: input.username,
                password: encryptedPassword
            }
        })
        console.log(user)
        return {msg: 'Exito'}
    }),
})