import Header from "./components/Header";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth();
  return (
    <div>
      <div className="h-screen bg-gradient-to-br from-black via-[#111] to-black text-white">
        <Header />
        <main className="p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
