"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteJob } from "@/app/lib/actions";
import { useState } from "react";

export function DeleteJob({
  id,
  project_id,
}: {
  id: string;
  project_id: string;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClick = () => {
    if (confirmDelete) {
      deleteJob(id, project_id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <>
      {confirmDelete ? (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <p>Bạn có chắc chắn muốn xóa công việc này?</p>
            <div className="mt-4">
              <button
                onClick={handleClick}
                className="mr-4 px-4 py-2 bg-red-500 font-bold text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-300 font-bold text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition duration-300 ease-in-out cursor-pointer"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={handleClick}
        className="flex flex-row justify-center ml-2 gap-2 rounded-md border-2 border-neutral-300 px-2 py-1 font-bold hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-100 ease-in-out cursor-pointer"
      >
        <TrashIcon className="w-5" />
        <span className="hidden md:inline-block">Xóa</span>
      </button>
    </>
  );
}
