import { MembersField, JobForm } from "@/app/lib/definitions";
import {
  ClipboardDocumentListIcon,
  TagIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
  MinusCircleIcon,
  CheckIcon,
  AtSymbolIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateJob, addJobsMember, deleteJobsMember } from "@/app/lib/actions";
import StatusCheck from "./status-check";

export default function EditProjectForm({
  job,
  members,
}: {
  job: JobForm;
  members: MembersField[];
}) {
  const updateJobWithId = updateJob.bind(null, job.job_id);
  const addMem = addJobsMember.bind(null, job.job_id);
  const deleteMem = deleteJobsMember.bind(null, job.job_id);
  const dl = job.deadline ? new Date(job.deadline) : null;
  const gmtPlus7Offset = 7 * 60 * 60 * 1000;
  const adjustedDeadline = dl ? new Date(dl.getTime() + gmtPlus7Offset) : null;

  return (
    <main>
      <div className="hidden">
        <StatusCheck
          status={job.status}
          result_url={job.result_url}
          deadline={job.deadline}
          id={job.job_id}
        />
      </div>
      <div className="rounded-md bg-gray-50 p-4 mb-6 md:p-6">
        <form action={addMem}>
          <input
            type="hidden"
            id="projectId"
            name="projectId"
            defaultValue={job.project_id}
          />
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
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

                <TrashIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
      <form action={updateJobWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <input
            type="hidden"
            id="projectId"
            name="projectId"
            value={job.project_id}
          />
          {/*Job's Name*/}
          <div className="mb-4">
            <label htmlFor="jobName" className="mb-2 block text-sm font-medium">
              Tên công việc
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="jobName"
                  name="jobName"
                  defaultValue={job.job_name}
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
              Trạng thái công việc
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 mb-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="Chưa làm"
                    name="status"
                    type="radio"
                    value="Chưa làm"
                    defaultChecked={job.status === "Chưa làm"}
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
                    defaultChecked={job.status === "Đang làm"}
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
                    defaultChecked={job.status === "Đã làm"}
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
            <label
              htmlFor="deadline"
              className="mb-2 block text-sm font-medium"
            >
              Hạn hoàn thành
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  placeholder=""
                  defaultValue={
                    adjustedDeadline
                      ? adjustedDeadline.toISOString().slice(0, 16)
                      : ""
                  }
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pr-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/*Description*/}
          <div className="mb-4">
            <label
              htmlFor="jobDescription"
              className="mb-2 block text-sm font-medium"
            >
              Mô tả công việc
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder=""
                  defaultValue={job.description}
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/*Result URL*/}
          <div className="mb-4">
            <label
              htmlFor="resultUrl"
              className="mb-2 block text-sm font-medium"
            >
              Đường dẫn kết quả
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="resultUrl"
                  name="resultUrl"
                  placeholder=""
                  defaultValue={job.result_url}
                  className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`/dashboard/${job.project_id}/edit`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Quay lại
          </Link>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
          >
            Lưu
          </Button>
        </div>
      </form>
    </main>
  );
}
