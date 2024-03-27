import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "@/public/quanlycongviec.com-white.svg";
import { getServerSession } from "next-auth";
import UserCard from "./user-card";

export default async function SideNav() {
  const session = await getServerSession();
  return (
    <div className="flex h-full flex-col px-1 py-1 md:px-1">
      <div className="mb-1 flex h-20 bg-neutral-800 rounded-md p-4 md:h-40">
        <div className="flex-grow items-center">
          <Image src={logo} alt="logo" width={400} height={50} priority />
        </div>
        {/* <div className="flex items-end justify-end">
          <BellIcon className="w-7" />
        </div> */}
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />
        <div className="hidden h-auto w-full grow bg-neutral-800 rounded-md md:block"></div>
        <Link
          className="flex h-[48px] w-full grow bg-neutral-800 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-emerald-300 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
          href="/dashboard/account"
        >
          <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
          </section>
        </Link>
      </div>
    </div>
  );
}
