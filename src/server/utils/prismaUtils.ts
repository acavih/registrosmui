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

export const connectOrCreateResourcee = (name: any) => {
    return {
        where: {
            name: typeof name === 'string' ? name : name.name
        },
        create: {
            name: typeof name === 'string' ? name : name.name
        }
    }
}

export const connectOrCreateResourceMultiple = a => {
    return typeof a === 'string' ? {name: a} : a
}