"use client";

import { Accounts } from "@/app/lib/definitions";
import {
  CalendarDaysIcon,
  PhoneIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { updateUser } from "@/app/lib/actions";
import LogOut from "./logout";
import { useState } from "react";

export default function EditUserForm({ acc }: { acc: Accounts }) {
  const [error, setError] = useState("");
  const updateUserWithId = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await updateUser(acc.user_id, formData);
    if (response && response.message) {
      setError(response.message);
    }
  };
  const dob = acc.date_of_birth ? new Date(acc.date_of_birth) : null;
  const gmtPlus7Offset = 7 * 60 * 60 * 1000;
  const adjustedDob = dob ? new Date(dob.getTime() + gmtPlus7Offset) : null;

  return (
    <main>
      <form onSubmit={updateUserWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {error && <div className="text-red-500 text-md mb-2">{error}</div>}
          {/*User's Name*/}
          <div className="mb-4">
            <label
              htmlFor="user_name"
              className="mb-2 block text-sm font-medium"
            >
              Họ và tên
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="user_name"
                  name="user_name"
                  defaultValue={acc.user_name}
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/*Date of Birth*/}
          <div className="mb-4">
            <label
              htmlFor="date_of_birth"
              className="mb-2 block text-sm font-medium"
            >
              Ngày sinh
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  defaultValue={
                    adjustedDob ? adjustedDob.toISOString().split("T")[0] : ""
                  }
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/*Phone*/}
          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Số điện thoại
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  defaultValue={acc.phone}
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
          >
            Lưu thông tin
          </Button>
        </div>
      </form>
      <LogOut />
    </main>
  );
}
