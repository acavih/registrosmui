import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure, router } from "../trpc";
import { connectOrCreateResource } from "../utils/prismaUtils";
import { z } from "zod";

const partnerValidator = z.object({
    id: z.string().optional(),
    name: z.string(),
    surname: z.string(),
    code: z.string(),
    birthdate: z.string(),
    email: z.string(),
    phone: z.string(),
    notes: z.string(),
    pendent: z.string(),
    sipcard: z.string(),

    nationality: z.string().default('NS/NC'),
    residency: z.string().default('NS/NC'),
    sex: z.string().default('NS/NC'),
    partnerState: z.string().default('NS/NC'),
    howDidKnowus: z.string().default('NS/NC'),
    yearDidKnowUs: z.string().default('NS/NC'),
})

export const partnersRouter = router({
    create: privateProcedure.input(partnerValidator).mutation(async ({ input }) => {
        console.log(input.birthdate)
        try {
            const partner = await prismaClient.partner.create({
                data: {
                    nationality: { connectOrCreate: connectOrCreateResource(input.nationality)},
                    residency: { connectOrCreate: connectOrCreateResource(input.residency)},
                    sex: { connectOrCreate: connectOrCreateResource(input.sex)},
                    partnerState: { connectOrCreate: connectOrCreateResource(input.partnerState)},
                    howDidKnowus: { connectOrCreate: connectOrCreateResource(input.howDidKnowus)},
                    yearDidKnowUs: { connectOrCreate: connectOrCreateResource(input.yearDidKnowUs)},
    
                    name: input.name,
                    surname: input.surname,
                    code: input.code,
                    birthdate: new Date(input.birthdate).toISOString(),
                    email: input.email,
                    phone: input.phone,
                    notes: input.notes,
                    pendent: input.pendent,
                    sipcard: input.sipcard,
                }
            })
    
            return {msg: 'Exito', data: partner}
        } catch (error) {
            console.log(error)
            throw error
        }
    }),
    update: privateProcedure.input(partnerValidator).mutation(async ({ input }) => {
        console.log(input.birthdate)
        try {
            const partner = await prismaClient.partner.update({
                where: {
                    id: input.id
                },
                data: {
                    nationality: { connectOrCreate: connectOrCreateResource(input.nationality)},
                    residency: { connectOrCreate: connectOrCreateResource(input.residency)},
                    sex: { connectOrCreate: connectOrCreateResource(input.sex)},
                    partnerState: { connectOrCreate: connectOrCreateResource(input.partnerState)},
                    howDidKnowus: { connectOrCreate: connectOrCreateResource(input.howDidKnowus)},
                    yearDidKnowUs: { connectOrCreate: connectOrCreateResource(input.yearDidKnowUs)},
    
                    name: input.name,
                    surname: input.surname,
                    code: input.code,
                    birthdate: new Date(input.birthdate).toISOString(),
                    email: input.email,
                    phone: input.phone,
                    notes: input.notes,
                    pendent: input.pendent,
                    sipcard: input.sipcard,
                }
            })

            return {msg: 'Exito', data: partner}
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})