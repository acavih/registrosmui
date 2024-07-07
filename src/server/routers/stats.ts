import { prismaClient } from "@/utils/prismaClient";
import { privateProcedure,  router } from "../trpc";
import { z } from "zod";
import _ from 'lodash'

export const statsRouter = router({
    getStats: privateProcedure.input(
        z.object({
            firstDate: z.string(),
            lastDate: z.string()
        })
    ).query(async ({ input: {firstDate, lastDate} }) => {
        try {
            console.log({firstDate, lastDate})
            const attentions = await prismaClient.attention.findMany({
                where: {
                    date: {
                        gte: new Date(firstDate),
                        lt: new Date(lastDate)
                    }
                },
                include: {
                    TypeAttentions: true,
                    PlaceAttention: true,
                    Projects: true,
                    AttentionsReasons: true,
                    DerivedFrom: true,
                    DerivedTo: true,
                    Formation: true,
                    Volunteer: true,
                    partner: {
                        include: {
                            sex: true,
                            nationality: true,
                            residency: true,
                            partnerState: true,
                            howDidKnowus: true,
                            yearDidKnowUs: true
                        }
                    }
                }
            })
            // attentions[0].partner.residency
            const partners = _.uniqBy(attentions.map(a => a.partner), 'id')
            console.log(partners.length, attentions.length)
            return {attentions, partners}
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})