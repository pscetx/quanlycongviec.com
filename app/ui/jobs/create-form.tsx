"use client";

import { MembersField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  TagIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
  MinusCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createJob } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Form({
  members,
  id,
}: {
  members: MembersField[];
  id: string;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createJob, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Project's Id*/}
        <input type="hidden" id="projectId" name="projectId" value={id} />

        {/*Job's Name*/}
        <div className="mb-4">
          <label htmlFor="jobName" className="mb-2 block text-sm font-medium">
            Nhập tên công việc
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jobName"
                name="jobName"
                placeholder=""
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Job Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Chọn trạng thái công việc
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 mb-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Chưa làm"
                  name="status"
                  type="radio"
                  value="Chưa làm"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Chưa làm"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 text-white px-3 py-1.5 text-xs font-medium"
                >
                  Chưa làm <MinusCircleIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Đang làm"
                  name="status"
                  type="radio"
                  value="Đang làm"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Đang làm"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-300 text-black px-3 py-1.5 text-xs font-medium"
                >
                  Đang làm <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Đã làm"
                  name="status"
                  type="radio"
                  value="Đã làm"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Đã làm"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 text-white px-3 py-1.5 text-xs font-medium"
                >
                  Đã làm <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/*Deadline Input */}
        <div className="mb-4">
          <label htmlFor="deadline" className="mb-2 block text-sm font-medium">
            Chọn hạn hoàn thành
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                placeholder=""
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pr-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Choose Members */}
        <div className="mb-4">
          <label htmlFor="members" className="mb-2 block text-sm font-medium">
            Chọn thành viên
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div key={member.user_id} className="flex items-center">
                <input
                  id={`member-${member.user_id}`}
                  name="jobMemberIds"
                  type="checkbox"
                  value={member.user_id}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <img
                  src={member.profile_url}
                  alt={`Profile Image of ${member.user_name}`}
                  className="w-5 h-5 rounded-full ml-2"
                />
                <label
                  htmlFor={`member-${member.user_id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {member.user_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/*Description*/}
        <div className="mb-4">
          <label
            htmlFor="jobDescription"
            className="mb-2 block text-sm font-medium"
          >
            Nhập mô tả công việc
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="jobDescription"
                name="jobDescription"
                placeholder=""
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Result URL*/}
        <div className="mb-4">
          <label htmlFor="resultUrl" className="mb-2 block text-sm font-medium">
            Nhập đường dẫn kết quả
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="resultUrl"
                name="resultUrl"
                placeholder=""
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/${id}/edit`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          Hủy
        </Link>

        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
        >
          Tạo mới công việc
        </Button>
      </div>
    </form>
  );
}
