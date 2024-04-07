"use client";

import { MembersField, ProjectForm } from "@/app/lib/definitions";
import {
  ClipboardDocumentListIcon,
  TagIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { DeleteProject } from "./buttons";
import { updateProject } from "@/app/lib/actions";

export default function EditInvoiceForm({
  project,
  members,
  categories,
}: {
  project: ProjectForm;
  members: MembersField[];
  categories: string[];
}) {
  const updateProjectWithId = updateProject.bind(null, project.project_id);

  return (
    <form action={updateProjectWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Project's Name*/}
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="mb-2 block text-sm font-medium"
          >
            Nhập tên dự án
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="projectName"
                name="projectName"
                defaultValue={project.project_name}
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Category*/}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Chọn phân loại dự án
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-9 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={project.category}
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Chọn phân loại
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/*Start Date Input*/}
        <div className="mb-4">
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
            Chọn ngày dự án bắt đầu
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="date"
                id="startDate"
                name="startDate"
                defaultValue={
                  project.start_date ? adjustToICT(project.start_date) : ""
                }
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pr-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*End Date Input */}
        <div className="mb-4">
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
            Chọn ngày dự án kết thúc
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="date"
                id="endDate"
                name="endDate"
                defaultValue={
                  project.end_date ? adjustToICT(project.end_date) : ""
                }
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pr-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Description*/}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Nhập mô tả dự án
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                defaultValue={project.description}
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Choose Members*/}
        <div className="mb-4">
          <label htmlFor="members" className="mb-2 block text-sm font-medium">
            Chọn thành viên dự án
          </label>
          <div className="relative">
            <div className="inline-block relative w-full">
              <select
                id="members"
                name="memberIds"
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="members-error"
                multiple
              >
                {members.map((member) => (
                  <option key={member.user_id} value={member.user_id}>
                    {member.user_name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Hủy
        </Link>
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700"
        >
          Xác nhận
        </Button>
      </div>
    </form>
  );
}

function adjustToICT(dateString: string) {
  const date = new Date(dateString);
  const offset = 7 * 60 * 60 * 1000; // Offset in milliseconds for GMT+7 (7 hours ahead of GMT)
  const utcTimestamp = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const ictTimestamp = utcTimestamp + offset;
  const ictDate = new Date(ictTimestamp);
  const year = ictDate.getFullYear();
  const month = String(ictDate.getMonth() + 1).padStart(2, "0");
  const day = String(ictDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
