import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure,  router } from "../trpc";
import { z } from "zod";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";
import { connectOrCreateResource, connectOrCreateResourcee, connectOrCreateResourceMultiple } from "../utils/prismaUtils";
import EditAttention from "@/app/(private)/partners/[id]/attentions/EditAttention";

const attentionValidator = z.object({
    id: z.string().optional(),
    note: z.string(),
    date: z.string(),
    pendent: z.string(),
    pendentDate: z.string(),
    PlaceAttention: z.any(),
    TypeAttentions: z.any(),
    Projects: z.any(),
    AttentionsReasons: z.any(),
    DerivedTo: z.any(),
    DerivedFrom: z.any(),
    Formation: z.any(),
    Volunteer: z.any(),
    partnerId: z.string().optional()
})

const attentionValidatorOld = z.object({
    id: z.string().optional(),
    note: z.string(),
    date: z.string(),
    pendent: z.string(),
    pendentDate: z.string(),
    placeAttention: z.string(),
    typeAttentions: z.array(z.string()),
    projects: z.array(z.string()),
    attentionsReasons: z.array(z.string()),
    derivedTo: z.array(z.string()),
    derivedFrom: z.array(z.string()),
    formation: z.array(z.string()),
    volunteer: z.array(z.string()),
    partnerId: z.string().optional()
})

export const attentionsRouter = router({
    createAttention: privateProcedure.input(attentionValidatorOld).mutation(async ({ input }) => {
        try {
            console.log(input.date, input.pendent)
            const attention = await prismaClient.attention.create({
                data: {
                    note: input.note,
                    date: new Date(input.date).toISOString(),
                    pendent: input.pendent,
                    pendentDate: new Date(input.pendentDate).toISOString(),
                    PlaceAttention: {
                        connectOrCreate: connectOrCreateResourcee(input.placeAttention)
                    },
                    TypeAttentions: {
                        connectOrCreate: input.typeAttentions.map(connectOrCreateResourceMultiple)
                    },
                    Projects: {
                        connectOrCreate: input.projects.map(connectOrCreateResourceMultiple)
                    },
                    AttentionsReasons: {
                        connectOrCreate: input.attentionsReasons.map(connectOrCreateResourceMultiple)
                    },
                    DerivedTo: {
                        connectOrCreate: input.derivedTo.map(connectOrCreateResourceMultiple)
                    },
                    DerivedFrom: {
                        connectOrCreate: input.derivedFrom.map(connectOrCreateResourceMultiple)
                    },
                    Formation: {
                        connectOrCreate: input.formation.map(connectOrCreateResourceMultiple)
                    },
                    Volunteer: {
                        connectOrCreate: input.volunteer.map(connectOrCreateResourceMultiple)
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
    }),
    editAttention: privateProcedure.input(attentionValidator).mutation(async ({ input }) => {
        try {
            console.log('INPUT', input.id)
            const attention = await prismaClient.attention.update({
                where: {
                    id: input.id
                },
                data: {
                    note: input.note,
                    date: new Date(input.date).toISOString(),
                    pendent: input.pendent,
                    pendentDate: new Date(input.pendentDate).toISOString(),
                    PlaceAttention: {
                        connectOrCreate: connectOrCreateResourcee(input.PlaceAttention)
                    },
                    Formation: {
                        set: input.Formation.map(connectOrCreateResourceMultiple)
                    },
                    AttentionsReasons: {
                        set: input.AttentionsReasons.map(connectOrCreateResourceMultiple)
                    },
                    DerivedFrom: {
                        set: input.DerivedFrom.map(connectOrCreateResourceMultiple)
                    },
                    DerivedTo: {
                        set: input.DerivedTo.map(connectOrCreateResourceMultiple)
                    },
                    Projects: {
                        set: input.Projects.map(connectOrCreateResourceMultiple)
                    },
                    TypeAttentions: {
                        set: input.TypeAttentions.map(connectOrCreateResourceMultiple)
                    },
                    Volunteer: {
                        set: input.Volunteer.map(connectOrCreateResourceMultiple)
                    },
                }
            })
            return {msg: 'Exito', data: attention}
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})