import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";
import { createTRPCContext } from "@/server/createTRPCContext";

const handler = async (req: Request) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: createTRPCContext
    });
};

export { handler as GET, handler as POST };