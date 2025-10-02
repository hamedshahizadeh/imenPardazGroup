import LoginPage from "@/components/templates/auth/Login";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
export default async function Logins() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <LoginPage />;
}
