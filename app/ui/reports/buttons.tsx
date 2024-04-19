import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateReport({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/reports/${id}`}
      className="rounded-md border-2 border-neutral-300 px-2 py-1 font-bold hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition duration-100 ease-in-out cursor-pointer"
    >
      <div className="flex flex-row justify-center gap-2 md:w-28">
        <PlusIcon className="w-4" />
        <span className="hidden md:inline-block">Tạo báo cáo</span>
      </div>
    </Link>
  );
}
