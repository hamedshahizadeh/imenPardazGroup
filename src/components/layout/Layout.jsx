import ChatMenu from "../modules/chats/Chats";
import ContactButton from "../modules/ContactButton/ContactButton";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ChatMenu />
        <div className="fixed top-0.5 z-40 right-0 left-0">
          <Header />
        </div>
        <Toaster
          toastOptions={{
            position: "top-left",
            duration: 3000,
            style: {
              background: "#1f2937",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "8px",
              padding: "8px 12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
              zIndex: 999999, 
            },
            success: {
              style: {
                background: "#059669",
              },
              iconTheme: {
                primary: "#34d399",
                secondary: "#fff",
              },
            },
            error: {
              style: {
                background: "#b91c1c",
              },
              iconTheme: {
                primary: "#f87171",
                secondary: "#fff",
              },
            },
          }}
        />
        <main className="flex-1 font-sans">{children}</main>

        <footer className="w-full">
          <Footer />
        </footer>
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-full h-full border-3 border-[#49c5b6] rounded-none"></div>
        </div>
      </div>
    </>
  );
}
