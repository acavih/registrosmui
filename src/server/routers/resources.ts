import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure, router } from "../trpc";
import {z} from "zod";

export const ResourcesRouter = router({
    get: privateProcedure.input(
        z.object({
            name: z.enum([
                'sex', 'nationalities', 'residencies', 'partnerstates', 'howdidknowus', 'yeardidknowus',
                'typeattentions', 'placeattentions'
            ])
        })
    ).query(async ({ input }) => {
        try {
            const resources = await prismaClient.$queryRawUnsafe(`SELECT * FROM resources_${input.name}`)
            return resources
        } catch (error) {
            console.log(error)
            throw error
        }
    }),
    create: privateProcedure.input(
        z.object({
            name: z.string(),
            value: z.string()
        })
    ).mutation(async ({ input }) => {
        try {
            const resource = await prismaClient.$queryRawUnsafe(`INSERT INTO resources_${input.name} (id, name) VALUES (uuid(), '${input.value}')`)
            return resource
        } catch (error) {
            console.log(error)
            throw error
        }
    }),
    update: privateProcedure.input(
        z.object({
            id: z.string(),
            name: z.string(),
            value: z.string()
        })
    ).mutation(async ({ input }) => {
        try {
            const resource = await prismaClient.$queryRawUnsafe(`UPDATE resources_${input.name} SET name = '${input.value}' WHERE id = '${input.id}'`)
            return resource
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})