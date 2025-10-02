import connectDB from "./connectDB";
import User from "@/models/User";
import { auth } from "@/app/auth";

export default async function FindUserMong() {
  const session = await auth();

  const email = session?.user.email;

  await connectDB();
  const user = await User.findOne({ email });

  return user;
}
