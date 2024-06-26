import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const createTRPCContextsdds = async (opts: FetchCreateContextFnOptions) => {
    // const session = await getSession({ req: opts.req });
    return {
        session: { id: 3, name: 'test' },
    };
};

export const createTRPCContext = async ({req}) => {
    return {
        user: {id: 2, name: 'test'}
    }
}

export type CreateTRPCContextType = Awaited<ReturnType<typeof createTRPCContext>>;
