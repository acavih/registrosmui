import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure, router } from "../trpc";
import {z} from "zod";

export const ResourcesRouter = router({
    get: privateProcedure.input(
        z.object({
            name: z.enum(['Sex', 'Nationality', 'Residency', 'PartnerState', 'HowDidKnowus', 'YearDidKnowus'])
        })
    ).query(async ({ input }) => {
        try {
            const resources = await prismaClient.$queryRawUnsafe(`SELECT * FROM ${input.name}`)
            return resources
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})