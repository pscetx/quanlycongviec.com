"use client";

import { MembersField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createProject } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Form({ members }: { members: MembersField[] }) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createProject, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Choose Members */}
          <div className="mb-4">
            <label htmlFor="members" className="mb-2 block text-sm font-medium">
              Choose members
            </label>
            <div className="relative">
              <select
                id="members"
                name="memberIds"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                multiple
                aria-describedby="members-error"
              >
                {members.map((member) => (
                  <option key={member.user_id} value={member.user_id}>
                    {member.user_name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/*Project's name */}
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="mb-2 block text-sm font-medium"
          >
            Enter a name for the project.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="projectName"
                name="projectName"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Enter a category for the project.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category"
                name="category"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*StartDate Input */}
        <div className="mb-4">
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
            Enter a date for the project.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="date" // Using type "date" for inputting a date
                id="startDate"
                name="startDate"
                placeholder="Enter date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*StartDate Input */}
        <div className="mb-4">
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
            Enter a date for the project.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="date" // Using type "date" for inputting a date
                id="endDate"
                name="endDate"
                placeholder="Enter date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Desc */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Enter a description for the project.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
}
