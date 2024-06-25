import { initTRPC, procedureTypes } from "@trpc/server";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(({next}) => {
    console.log('TODO: autenticar aplicación')
    return next()
})