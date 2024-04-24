import { lusitana } from "@/app/ui/fonts";
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
import {
  updateProject,
  addMember,
  deleteMember,
  addAdmin,
  deleteAdmin,
} from "@/app/lib/actions";
import JobsTable from "@/app/ui/jobs/list-of-jobs";
import CreateJob from "../jobs/buttons";

export default function EditProjectForm({
  project,
  members,
  admins,
  categories,
}: {
  project: ProjectForm;
  members: MembersField[];
  admins: MembersField[];
  categories: string[];
}) {
  const updateProjectWithId = updateProject.bind(null, project.project_id);
  const addMem = addMember.bind(null, project.project_id);
  const deleteMem = deleteMember.bind(null, project.project_id);
  const addAd = addAdmin.bind(null, project.project_id);
  const deleteAd = deleteAdmin.bind(null, project.project_id);
  const startDate = project.start_date ? new Date(project.start_date) : null;
  const endDate = project.end_date ? new Date(project.end_date) : null;
  const gmtPlus7Offset = 7 * 60 * 60 * 1000;
  const adjustedStartDate = startDate
    ? new Date(startDate.getTime() + gmtPlus7Offset)
    : null;
  const adjustedEndDate = endDate
    ? new Date(endDate.getTime() + gmtPlus7Offset)
    : null;

  return (
    <main>
      <div className="rounded-md bg-gray-50 p-4 mb-6 md:p-6">
        <form action={addMem}>
          <div className="mb-4">
            <label
              htmlFor="memberEmail"
              className="mb-2 block text-sm font-medium"
            >
              Thêm thành viên mới
            </label>
            <div className="flex flex-row relative mt-2 rounded-md">
              <div className="relative w-full">
                <input
                  id="memberEmail"
                  name="memberEmail"
                  placeholder="Nhập email thành viên mới"
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <Button
                type="submit"
                className="justify-center w-20 ml-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
              >
                Thêm
              </Button>
            </div>
          </div>
        </form>
        <form action={deleteMem}>
          <div className="mb-4">
            <label
              htmlFor="memberId"
              className="mb-2 block text-sm font-medium"
            >
              Xóa thành viên
            </label>
            <div className="flex flex-row relative mt-2 rounded-md">
              <div className="relative w-full">
                <select
                  id="memberId"
                  name="memberId"
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-9 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="memberId-error"
                >
                  <option value="" disabled>
                    Chọn thành viên
                  </option>
                  {members.map((member, index) => (
                    <option key={index} value={member.user_id}>
                      {member.email}
                    </option>
                  ))}
                </select>

                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <Button
                type="submit"
                className="justify-center w-20 ml-4 bg-yellow-600 hover:bg-red-500 active:bg-red-700 transition duration-300 ease-in-out"
              >
                Xóa
              </Button>
            </div>
            <div className="my-4">
              <label
                htmlFor="members"
                className="mb-2 block text-sm font-medium"
              >
                DANH SÁCH THÀNH VIÊN HIỆN TẠI
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                  <div key={member.user_id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={member.user_id}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <img
                      src={member.profile_url}
                      alt={`Profile Image of ${member.user_name}`}
                      className="w-8 h-8 rounded-full ml-2"
                    />
                    <label className="flex flex-col ml-2 text-gray-700">
                      <div className="text-sm">{member.user_name}</div>
                      <div className="italic text-xs">{member.email}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="rounded-md bg-gray-50 p-4 mb-6 md:p-6">
        <form action={addAd}>
          <div className="mb-4">
            <label
              htmlFor="adminEmail"
              className="mb-2 block text-sm font-medium"
            >
              Thêm quản trị viên mới
            </label>
            <div className="flex flex-row relative mt-2 rounded-md">
              <div className="relative w-full">
                <input
                  id="adminEmail"
                  name="adminEmail"
                  placeholder="Nhập email quản trị viên mới"
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <Button
                type="submit"
                className="justify-center w-20 ml-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
              >
                Thêm
              </Button>
            </div>
          </div>
        </form>
        <form action={deleteAd}>
          <div className="mb-4">
            <label htmlFor="adminId" className="mb-2 block text-sm font-medium">
              Xóa quản trị viên
            </label>
            <div className="flex flex-row relative mt-2 rounded-md">
              <div className="relative w-full">
                <select
                  id="adminId"
                  name="adminId"
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-9 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="adminId-error"
                >
                  <option value="" disabled>
                    Chọn quản trị viên
                  </option>
                  {admins.map((admin, index) => (
                    <option key={index} value={admin.user_id}>
                      {admin.email}
                    </option>
                  ))}
                </select>

                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <Button
                type="submit"
                className="justify-center w-20 ml-4 bg-yellow-600 hover:bg-red-500 active:bg-red-700 transition duration-300 ease-in-out"
              >
                Xóa
              </Button>
            </div>
            {/*Choose Members*/}
            <div className="my-4">
              <label
                htmlFor="admins"
                className="mb-2 block text-sm font-medium"
              >
                DANH SÁCH QUẢN TRỊ VIÊN HIỆN TẠI
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {admins.map((admin) => (
                  <div key={admin.user_id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={admin.user_id}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <img
                      src={admin.profile_url}
                      alt={`Profile Image of ${admin.user_name}`}
                      className="w-8 h-8 rounded-full ml-2"
                    />
                    <label className="flex flex-col ml-2 text-gray-700">
                      <div className="text-sm">{admin.user_name}</div>
                      <div className="italic text-xs">{admin.email}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <form action={updateProjectWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/*Project's Name*/}
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="mb-2 block text-sm font-medium"
            >
              Tên dự án
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
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Phân loại dự án
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
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium"
            >
              Ngày bắt đầu
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  defaultValue={
                    adjustedStartDate
                      ? adjustedStartDate.toISOString().split("T")[0]
                      : ""
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
              Ngày kết thúc
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  defaultValue={
                    adjustedEndDate
                      ? adjustedEndDate.toISOString().split("T")[0]
                      : ""
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
              Mô tả dự án
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
        </div>
        <div className="my-6 flex justify-end gap-4">
          <Link
            href="/dashboard/"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Quay lại
          </Link>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
          >
            Lưu thông tin
          </Button>
        </div>
      </form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-row justify-between mt-6 items-center">
          <h2
            className={`${lusitana.className} text-xl ml-2 font-extrabold text-emerald-800`}
          >
            Danh sách công việc
          </h2>
          <CreateJob id={project.project_id} />
        </div>
        <JobsTable id={project.project_id} />
      </div>
    </main>
  );
}
