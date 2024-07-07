import { prismaClient } from "@/utils/prismaClient"
import _ from 'lodash'
import StatsPage from "./StatsPage"
import { redirect } from "next/navigation"

const currentYear = new Date().getFullYear()

export default async function Page({searchParams: {firstDate, lastDate}}) {
    if (!firstDate || !lastDate) {
        redirect('/stats?firstDate=' + currentYear + '-01-01&lastDate=' + (currentYear + 1) + '-01-01')
    }

    console.log('REFRESCANDO', firstDate, lastDate)

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
            partner: true
        }
    })
    const partners = _.uniqBy(attentions.map(a => a.partner), 'id')
    console.log(partners.length, attentions.length)
    return (
        <StatsPage {...{partners, attentions}} />
    )
}