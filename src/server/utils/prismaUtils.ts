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

export const connectOrCreateResourceMultiple = (typeAttention) => ({
    where: { name: typeAttention },
    create: { name: typeAttention }
})

export const connectOrCreateResourceMultipleee = (typeAttention) => ({
    where: { name: typeAttention.name },
    create: { name: typeAttention.name }
})