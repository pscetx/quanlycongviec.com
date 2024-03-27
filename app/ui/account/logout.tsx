"use client";

import { signOut } from "next-auth/react";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function LogOut() {
  return (
    <span
      onClick={() => {
        signOut();
      }}
    >
      <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-white bg-yellow-600 p-3 text-sm font-medium hover:bg-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Đăng xuất</div>
      </button>
    </span>
  );
}
