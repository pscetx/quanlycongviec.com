"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteProject } from "@/app/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateProject() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center bg-gradient-to-r from-emerald-400 to-emerald-500 py-2 px-4 rounded-md inline-block text-white text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-gradient-to-t hover:from-emerald-500 hover:to-emerald-400 transition duration-500 ease-in-out cursor-pointer"
    >
      <span className="hidden md:block">Tạo dự án</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProject({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="rounded-md border-2 border-neutral-300 px-2 py-1 font-bold hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition duration-100 ease-in-out cursor-pointer"
    >
      <div className="flex flex-row justify-center gap-2 w-24">
        <PencilIcon className="w-4" />
        <span>Chỉnh sửa</span>
      </div>
    </Link>
  );
}

export function DeleteProject({ id }: { id: string }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteProjectWithId = deleteProject.bind(null, id);
  const router = useRouter();

  const handleDelete = () => {
    if (confirmDelete) {
      deleteProjectWithId();
      router.push("/dashboard");
    }
  };

  const toggleConfirmation = () => {
    setConfirmDelete(!confirmDelete);
  };

  return (
    <form onSubmit={handleDelete}>
      {confirmDelete && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <p>Bạn có chắc chắn muốn xóa dự án này?</p>
            <div className="mt-4">
              <button
                type="submit"
                className="mr-4 px-4 py-2 bg-red-500 font-bold text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
              >
                Xác nhận
              </button>
              <button
                type="button"
                onClick={toggleConfirmation}
                className="px-4 py-2 bg-gray-300 font-bold text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition duration-300 ease-in-out cursor-pointer"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={toggleConfirmation}
        className="flex flex-row p-2 justify-center gap-2 rounded-md border-2 border-neutral-300 bg-red-500 text-white font-bold hover:bg-red-600 hover:border-red-500 transition duration-300 ease-in-out cursor-pointer"
      >
        <TrashIcon className="w-6" />
        <span>Xóa dự án</span>
      </button>
    </form>
  );
}
