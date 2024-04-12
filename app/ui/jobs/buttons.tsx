"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteJob } from "@/app/lib/actions";

export default async function CreateJob({ id }: { id: string }) {
  const job_id = id;
  return (
    <Link
      href={`/dashboard/${job_id}/create`}
      className="flex h-10 items-center bg-gradient-to-r from-emerald-400 to-green-500 px-2 rounded-md inline-block text-white text-md font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
    >
      <span className="hidden md:block">Tạo công việc</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateJob({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/jobs/${id}/edit`}
      className="flex flex-row rounded-md border-2 border-neutral-300 px-2 py-1 font-bold hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition duration-100 ease-in-out cursor-pointer"
    >
      <div className="flex flex-row justify-center gap-2 md:w-20">
        <PencilIcon className="w-4" />
        <span className="hidden md:inline-block">Chi tiết</span>
      </div>
    </Link>
  );
}

export function DeleteJob({ id }: { id: string }) {
  const deleteJobWithId = deleteJob.bind(null, id);
  return (
    <form action={deleteJobWithId}>
      <button className="flex flex-row justify-center ml-2 gap-2 rounded-md border-2 border-neutral-300 px-2 py-1 font-bold hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-100 ease-in-out cursor-pointer">
        <TrashIcon className="w-5" />
        <span className="hidden md:inline-block">Xóa</span>
      </button>
    </form>
  );
}
