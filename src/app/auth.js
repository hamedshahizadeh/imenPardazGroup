import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
class ConnectedDB extends CredentialsSignin {
  code = "مشکلی در اتصال به دیتا بیس رخ داده است ";
}
class InvalidData extends CredentialsSignin {
  code = "لطفا اطلاعات معتبر وارد کنید  ";
}
class NotSignup extends CredentialsSignin {
  code = "لطفا ابتدا حساب کاربری ایجاد کنید";
}
class EmailOrPassword extends CredentialsSignin {
  code = "ایمیل یا رمز عبور اشتباه است";
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new ConnectedDB();
        }

        if (!email || !password) throw new InvalidData();

        const user = await User.findOne({ email: email });
        if (!user) throw new NotSignup();

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new EmailOrPassword();
        return { email };
      },
    }),
  ],
});
