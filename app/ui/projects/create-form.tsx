"use client";

import { MembersField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  TagIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createProject } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function Form({
  members,
  categories,
}: {
  members: MembersField[];
  categories: string[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createProject, initialState);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [inputEmail, setInputEmail] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleAddMember = () => {
    const member = members.find((member) => member.email === inputEmail);
    if (member && !selectedMembers.includes(member.user_id)) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        member.user_id,
      ]);
      setInputEmail("");
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userId = event.target.value;
    if (event.target.checked) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        userId,
      ]);
    } else {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((id) => id !== userId)
      );
    }
  };

  const displayedMembers = members.filter((member) =>
    selectedMembers.includes(member.user_id)
  );

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <label htmlFor="inputEmail" className="mb-2 block text-sm font-medium">
          Nhập email
        </label>
        <div className="flex items-center">
          <div className="relative w-full">
            <input
              id="inputEmail"
              type="text"
              value={inputEmail}
              onChange={handleInputChange}
              className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <Button
            onClick={handleAddMember}
            className="justify-center w-20 ml-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
          >
            Thêm
          </Button>
        </div>
      </div>

      <form action={dispatch}>
        {/* Choose Members */}
        <div className="mb-4">
          <label htmlFor="members" className="mb-2 block text-sm font-medium">
            Chọn thành viên
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {displayedMembers.map((member) => (
              <div key={member.user_id} className="flex items-center">
                <input
                  id={`member-${member.user_id}`}
                  name="memberIds"
                  type="checkbox"
                  value={member.user_id}
                  checked={selectedMembers.includes(member.user_id)}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={handleCheckboxChange}
                />
                <img
                  src={member.profile_url}
                  alt={`Profile Image of ${member.user_name}`}
                  className="w-8 h-8 rounded-full ml-2"
                />
                <label
                  htmlFor={`member-${member.user_id}`}
                  className="ml-2 text-gray-700"
                >
                  <div className="text-sm">{member.user_name}</div>
                  <div className="italic text-xs">{member.email}</div>
                </label>
              </div>
            ))}
          </div>
        </div>

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
                placeholder=""
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
            <Link
              className="hover:text-emerald-700 transition duration-300 ease-in-out"
              href="/dashboard/account"
            >
              {" "}
              (thêm phân loại mới tại đây)
            </Link>
            .
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-9 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
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
                placeholder=""
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
                placeholder=""
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Hủy
          </Link>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
          >
            Tạo mới dự án
          </Button>
        </div>
      </form>
    </div>
  );
}
