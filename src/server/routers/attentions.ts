import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure,  router } from "../trpc";
import { z } from "zod";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";
import { connectOrCreateResource, connectOrCreateResourceMultiple } from "../utils/prismaUtils";

const attentionValidator = z.object({
    id: z.string().optional(),
    note: z.string(),
    date: z.string(),
    pendent: z.string(),
    placeAttention: z.string(),
    typeAttentions: z.array(z.string()),
    partnerId: z.string()
})

export const attentionsRouter = router({
    createAttention: privateProcedure.input(attentionValidator).mutation(async ({ input }) => {
        try {
            console.log(input.date, input.pendent)
            const attention = await prismaClient.attention.create({
                data: {
                    note: input.note,
                    date: new Date(input.date).toISOString(),
                    pendent: input.pendent,
                    PlaceAttention: {
                        connectOrCreate: connectOrCreateResource(input.placeAttention)
                    },
                    TypeAttentions: {
                        connectOrCreate: input.typeAttentions.map(connectOrCreateResourceMultiple)
                    },
                    partner: {
                        connect: {
                            id: input.partnerId
                        }
                    }
                }
            })

            return {msg: 'Exito', data: attention}
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})