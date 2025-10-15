import DashBlog from "@/components/templates/dashboard/blog/DashBlog";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import FindUserMong from "@/utils/findUserMongo";
import { redirect } from "next/navigation";
export default async function page() {
  await connectDB();
  const session = await FindUserMong();
  if (!session) redirect("/auth/login");
  const user = await User.findOne({ email: session.email });
  if (user.role !== "OWER") {
    redirect("/dashboard");
  }
  return <DashBlog />;
}
