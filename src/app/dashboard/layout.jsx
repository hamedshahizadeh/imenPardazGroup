import DashboardLayout from "@/components/layout/dashboard/Dashboard";
import { redirect } from "next/navigation";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import FindUserMong from "@/utils/findUserMongo";

import { UserProvider } from "../../../context/UserContext";

export default async function layout({ children }) {
  const session = await FindUserMong();
  if (!session) {
    redirect("/auth/login");
  }

  await connectDB();
  const userDoc = await User.findOne({ email: session.email }).lean();
  if (!userDoc) return <h1>مشکلی پیش آمده است . . .</h1>;

  // ⚡ تبدیل به plain object
  const user = {
    ...userDoc,
    _id: userDoc._id.toString(),
    createdAt: userDoc.createdAt?.toString(),
    updatedAt: userDoc.updatedAt?.toString(),
  };

  return (
    <UserProvider user={user}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </UserProvider>
  );
}
