import AppLayout from "@/components/layouts/AppLayout"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()

    if (!session) {
        return redirect('/')
    }

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}