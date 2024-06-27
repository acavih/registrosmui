import { prismaClient } from "@/utils/prismaClient"
import ResourcesPage from "./ResourcesPage"

export default async function Page({searchParams: {type = 'sex'}}) {
    try {
        const resources = await prismaClient.$queryRawUnsafe(`SELECT * FROM resources_${type} ORDER BY name ASC`)
    
        return (
            <ResourcesPage resources={resources} type={type} />
        )
    } catch (error) {
        console.error(error)

        return (
            <ResourcesPage resources={[]} type={type} isError />
        )
    }
}