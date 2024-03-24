import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-1 py-1 md:px-1">
      <div className="mb-1 flex h-20 bg-neutral-800 items-start justify-end rounded-md p-4 md:h-40">
        <BellIcon className="w-8" />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />
        <div className="hidden h-auto w-full grow bg-neutral-800 rounded-md md:block"></div>
        <Link
          className="flex h-[48px] w-full grow bg-neutral-800 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-emerald-300 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
          href="/dashboard/account"
        >
          <UserCircleIcon className="w-6" />
          <button>/placeholder</button>
        </Link>
      </div>
    </div>
  );
}
