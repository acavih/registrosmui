import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
  title: "Login",
  description: "Login page",
};

export default function Home() {
  console.log(process.env.DATABASE_URL)
  return (
    <div>
      <LoginForm />
    </div>
  );
}


