import Register from '@/components/templates/auth/Register'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
export default async function Registers() {
   const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <Register/>
  )
}
