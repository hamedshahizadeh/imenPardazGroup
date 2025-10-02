import FindUserMong from "@/utils/findUserMongo";
import Navbar from "./menu";
import UserMenu from "./UserMenu";

export default async function Header() {
  const user = await FindUserMong();
  const name = user?.name || "hameed";
  const email = user?.email || "hameed";
  const isLoggedIn = !!user;
  return (
    <div className=" bg-gray-950/80 backdrop-blur-[10px]">
      <div className="container pt-2 pb-1 flex items-center justify-between border-b border-gray-700 ">
        <UserMenu
          isLoggedIn={isLoggedIn}
          name={JSON.parse(JSON.stringify(name))}
          email={JSON.parse(JSON.stringify(email))}
        />
        <div></div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
}
