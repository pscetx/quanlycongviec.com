import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocalNoHour, formatDateToLocal } from "@/app/lib/utils";
import MembersProfilesList from "../projects/member-list";
import { JobForm, MembersField, ProjectForm } from "@/app/lib/definitions";
import { updateResult } from "@/app/lib/actions";
import { Button } from "../button";
import JobStatus from "./status";
import StatusCheck from "./status-check";

export default async function JobDetails({
  job,
  members,
  project,
}: {
  job: JobForm;
  members: MembersField[];
  project: ProjectForm;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="min-w-full text-gray-900">
          <div className="w-full rounded-lg bg-neutral-100 py-3 text-sm mb-3 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            <div className="whitespace-nowrap p-3 pt-0 pl-6">
              <div className="flex items-center">
                <p
                  className={`${lusitana.className} text-xl font-extrabold text-emerald-800`}
                >
                  {project.project_name}
                </p>
                <MembersProfilesList id={project.project_id} />
              </div>
            </div>
            <div className="flex flex-row pl-6 pr-3 items-end justify-between">
              <div className="flex flex-col w-full gap-1">
                <div>
                  {"Ngày bắt đầu: "}
                  <span className="italic pl-1">
                    {formatDateToLocalNoHour(project.start_date)}
                  </span>
                </div>
                <div>
                  {"Ngày kết thúc:"}
                  <span className="italic pl-1">
                    {formatDateToLocalNoHour(project.end_date)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>
                  {"Phân loại: "}
                  <span className="font-bold">{project.category}</span>
                </div>
                <div>
                  {"Người tạo: "}
                  <span className="font-bold">{project.user_name}</span>
                </div>
              </div>
            </div>
            <div className="pl-6 pr-3 pt-1">
              {"Mô tả: "}
              {project.description}
            </div>
            <div className="mt-6 flow-root">
              <div className="flex justify-end w-full">
                <div className="min-w-full text-gray-900">
                  <div key={job.job_id} className="flex justify-center w-full">
                    <div
                      className={`${lusitana.className} flex w-1/12 justify-center items-center text-emerald-700 text-3xl font-bold`}
                    ></div>
                    <div className="py-3 mb-2 border-t border-l hover:bg-emerald-100 transition duration-300 ease-in-out rounded-l-lg rounded-r-none w-11/12">
                      <div className="flex items-center whitespace-nowrap p-3 pt-0">
                        <p
                          className={`${lusitana.className} text-lg font-extrabold text-emerald-800`}
                        >
                          {job.job_name}
                        </p>
                        <div className="ml-3">
                          <JobStatus status={job.status} />
                        </div>
                      </div>
                      <StatusCheck
                        status={job.status}
                        result_url={job.result_url}
                        deadline={job.deadline}
                        id={job.job_id}
                      />
                      <div className="flex flex-row px-3 justify-between">
                        <div>
                          {"Hạn hoàn thành:"}
                          <span className="font-bold pl-1">
                            {formatDateToLocal(job.deadline)}
                          </span>
                        </div>
                        <div>
                          {"Người tạo:"}
                          <span className="font-bold pl-1">
                            {job.user_name}
                          </span>
                        </div>
                      </div>
                      <div className="px-3 pt-1">
                        {"Mô tả: "}
                        {job.description}
                      </div>
                      <div className="px-3 pt-1">
                        {"Kết quả: "}
                        <a
                          href={job.result_url ?? undefined}
                          className="text-blue-600 hover:underline"
                        >
                          {job.result_url}
                        </a>
                      </div>
                      {job.status !== "Đã làm" && (
                        <form
                          className="flex flex-row mt-2 mx-3 gap-3"
                          action={updateResult.bind(null, job.job_id)}
                        >
                          <input
                            name="result"
                            placeholder="Cập nhật đường dẫn kết quả mới"
                            className="peer block w-full pl-2 transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 text-sm outline-2 placeholder:text-gray-500"
                            required
                          />
                          <Button
                            type="submit"
                            className="justify-center w-16 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
                          >
                            Lưu
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-5">
                <label
                  htmlFor="members"
                  className="mb-2 block text-sm font-medium"
                >
                  DANH SÁCH THÀNH VIÊN PHỤ TRÁCH
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
          </div>
        </div>
      </div>
    </div>
  );
}
