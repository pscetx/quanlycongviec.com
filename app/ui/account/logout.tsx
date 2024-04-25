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
      <button className="flex flex-row p-2 justify-center gap-2 rounded-md border-2 border-neutral-300 bg-yellow-600 text-white font-bold hover:bg-red-500 hover:border-red-400 transition duration-300 ease-in-out cursor-pointer">
        <PowerIcon className="w-6" />
        <div>Đăng xuất</div>
      </button>
    </span>
  );
}
