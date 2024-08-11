"use client"

import { ReactNode, useState } from "react";
import { trpcClient as trpcApiClient } from "./client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

export default function TRPCProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpcApiClient.createClient({
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                }),
            ],
        })
    );
    return (
        <trpcApiClient.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpcApiClient.Provider>
    );
}