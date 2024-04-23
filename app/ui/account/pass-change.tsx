"use client";

import { Accounts } from "@/app/lib/definitions";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { updatePassword } from "@/app/lib/actions";
import { useState } from "react";

export default function EditPasswordForm({ acc }: { acc: Accounts }) {
  const [error, setError] = useState("");
  const updatePasswordWithId = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await updatePassword(acc.user_id, formData);
    if (response && response.message) {
      setError(response.message);
    }
  };

  return (
    <form onSubmit={updatePasswordWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {error && <div className="text-red-500 text-md mb-2">{error}</div>}
        <div className="mb-4">
          <label
            htmlFor="oldpassword"
            className="mb-2 block text-sm font-medium"
          >
            Nhập mật khẩu cũ
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="password"
                id="oldpassword"
                name="oldpassword"
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="newpassword"
            className="mb-2 block text-sm font-medium"
          >
            Nhập mật khẩu mới
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="newpassword2"
            className="mb-2 block text-sm font-medium"
          >
            Nhập lại mật khẩu mới
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="password"
                id="newpassword2"
                name="newpassword2"
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 flex justify-end gap-4">
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
        >
          Đổi mật khẩu
        </Button>
      </div>
    </form>
  );
}
