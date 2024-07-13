"use client"

import { trpcClient } from "@/app/_trpc/client"
import { useState } from "react"
import StatsPage from "./StatsPage"

export default function Page () {
    const [firstDate, setFirstDate] = useState('2024-01-01')
    const [secondDate, setSecondDate] = useState('2024-12-31')

    const stats = trpcClient.stats.getStats.useQuery({firstDate, lastDate: secondDate}, {
        initialData: {
            partners: [],
            attentions: []
        }
    })

    function refresh(firstDate: string, secondDate: string) {
        setFirstDate(firstDate)
        setSecondDate(secondDate)
        // stats.refetch()
    }

    return (
        <>
            {stats.isLoading && <p>Cargando...</p>}
            {!stats.isLoading && <StatsPage fd={firstDate} sd={secondDate} partners={stats.data.partners} attentions={stats.data.attentions} refresh={refresh}  />}
        </>
    )
}