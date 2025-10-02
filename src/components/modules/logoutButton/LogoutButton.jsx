import { signOut } from "@/app/auth";
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {
  const handler = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <button
      className="flex items-center gap-3 text-xs md:text-sm font-sans font-medium 
                   bg-white/10 hover:bg-red-600/30 rounded-xl px-3 py-2 
                   transition duration-300 text-red-400 w-full
                   cursor-pointer"
      onClick={handler}
    >
      <CiLogout />
      خروج
    </button>
  );
}
