import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure, router } from "../trpc";
import {z} from "zod";

export const ResourcesRouter = router({
    get: privateProcedure.input(
        z.object({
            name: z.enum(
                ['sex', 'nationalities', 'residencies', 'partnerstates', 'howdidknowus', 'yeardidknowus']
            )
        })
    ).query(async ({ input }) => {
        try {
            const resources = await prismaClient.$queryRawUnsafe(`SELECT * FROM resources_${input.name}`)
            return resources
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})