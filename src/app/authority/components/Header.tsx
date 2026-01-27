"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { HeaderLogoutIcon } from "@/utils/svgicons";
import { logoutAction } from "@/actions";

const navItems = [
  { label: "Home", path: "/authority/home" },
  { label: "Applicants", path: "/authority/applicants" },
  { label: "Chats", path: "/authority/chats" },
  { label: "Settings", path: "/authority/settings" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      {/* HEADER – stays sharp */}
      <header className="relative   z-50">
        <div className="flex items-center justify-between pr-4 md:pr-6 py-2">
          <div
            className="text-white font-bold text-lg tracking-wide cursor-pointer"
            onClick={() => router.push("/")}
          >
            {/* DISSTRIKT */}
            <Image
              src="/assets/Logo.png"
              alt="Logo"
              width={150}
              height={50}
            />
          </div>

          <nav className="hidden  p-[5px] bg-zinc-800 rounded-lg md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className={`px-4 py-[15px] cursor-pointer rounded-lg text-sm transition
                  ${
                    isActive(item.path)
                      ? "bg-pink-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div onClick={()=>logoutAction()} className=" cursor-pointer rounded-lg bg-white/10 flex items-center justify-center text-white">
              <HeaderLogoutIcon />
            </div>

            <button
              className="md:hidden cursor-pointer p-2 rounded-md hover:bg-white/10"
              onClick={() => setOpen((p) => !p)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (under header, above blur) */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur border-t border-white/10 z-50 animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    router.push(item.path);
                    setOpen(false);
                  }}
                  className={`cursor-pointer text-left px-4 py-2 rounded-md text-sm transition
                    ${
                      isActive(item.path)
                        ? "bg-pink-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* BLUR OVERLAY – only content below header */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-x-0 top-[72px] bottom-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
}

