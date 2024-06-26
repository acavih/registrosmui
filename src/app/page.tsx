import LoginForm from "@/components/forms/LoginForm";
import AppLayoutGuest from "@/components/layouts/AppLayoutGuest";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
  description: "Login page",
};

export default async function Home() {
  const session = await getServerSession()
  console.log('session', session)
  if (session) {
    return redirect('/partners')
  }
  return (
    <AppLayoutGuest>
      <LoginForm />
    </AppLayoutGuest>
  );
}


