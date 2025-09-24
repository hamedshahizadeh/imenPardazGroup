
import Navbar from "./menu";
import UserMenu from "./UserMenu";

export default function Header() {
  const isLoggedIn = false
   const fakeUser = {
    name: "حامد شاهی زاده",
    email: "hamed.shahizadeh@gmail.com",
    avatar: "/images/user.jpeg",
  };
  return (
    <div className=" bg-gray-950/80 backdrop-blur-[10px]">
      <div className="container pt-2 pb-1 flex items-center justify-between border-b border-gray-700 ">
        <UserMenu isLoggedIn={isLoggedIn} user={fakeUser} />
        <div></div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
}
