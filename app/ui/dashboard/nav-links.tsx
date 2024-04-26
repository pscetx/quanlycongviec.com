"use client";

import {
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "DỰ ÁN", href: "/dashboard", icon: ClipboardDocumentListIcon },
  {
    name: "CÔNG VIỆC",
    href: "/dashboard/jobs",
    icon: BriefcaseIcon,
  },
  { name: "BÁO CÁO", href: "/dashboard/reports", icon: ChartBarIcon },
  { name: "LƯU TRỮ", href: "/dashboard/archives", icon: ArchiveBoxIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-12 grow bg-neutral-800 text-white items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-xl font-bold hover:bg-emerald-300 hover:text-green-600 transition duration-300 ease-in-out md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-zinc-100 text-emerald-400 transition duration-300 ease-in-out":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
