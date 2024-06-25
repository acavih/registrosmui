export const connectOrCreateResource = (name: string) => {
    return {
        where: {
            name
        },
        create: {
            name
        }
    }
}