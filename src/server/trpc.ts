import { TRPCError, initTRPC } from "@trpc/server";
import { CreateTRPCContextType } from "./createTRPCContext";
import { getServerSession } from "next-auth";

const t = initTRPC.context<CreateTRPCContextType>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(async ({next, ctx}) => {
    const session = await getServerSession()
    console.log(session)
    if (!session) {
        throw new TRPCError({code: 'UNAUTHORIZED'})
    }
    return next()
})