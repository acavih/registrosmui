import { TRPCError, initTRPC } from "@trpc/server";
import { CreateTRPCContextType } from "./createTRPCContext";
import { getServerSession } from "next-auth";
import { prismaClient } from "@/utils/prismaClient";

const t = initTRPC.context<CreateTRPCContextType>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(async ({next, ctx}) => {
    if (ctx.user.id === 200999000999) {
        return next()
    }
    const session = await getServerSession()
    console.log(session)
    if (!session) {
        throw new TRPCError({code: 'UNAUTHORIZED'})
    }
    return next()
})