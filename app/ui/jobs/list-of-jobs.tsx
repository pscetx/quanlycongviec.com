import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchJobs } from "@/app/lib/data";
import MembersProfilesList from "./member-list";
import JobStatus from "./status";
import { DeleteJob, UpdateJob } from "./buttons";

export default async function JobsTable({ id }: { id: string }) {
  const jobs = await fetchJobs(id);

  if (jobs.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-gray-600 mb-4">
          CHƯA CÓ CÔNG VIỆC
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="hidden min-w-full text-gray-900 md:table">
          {jobs?.map((job) => (
            <div
              key={job.job_id}
              className="w-full rounded-lg bg-neutral-100 hover:bg-emerald-100 transition duration-300 ease-in-out py-3 text-sm mb-2 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <div className="whitespace-nowrap p-3 pt-0">
                <div className="flex items-center">
                  <p
                    className={`${lusitana.className} text-lg font-extrabold text-emerald-800`}
                  >
                    {job.job_name}
                  </p>
                  <MembersProfilesList id={job.job_id} />
                </div>
              </div>
              <div className="flex flex-row pl-3 pr-3 justify-between">
                <div className="flex w-28">
                  <JobStatus status={job.status} />
                </div>
                <div className="flex w-72 pt-1">
                  {"Hạn hoàn thành:"}
                  <span className="font-bold pl-1">
                    {formatDateToLocal(job.deadline)}
                  </span>
                </div>
                <div className="flex w-52 pt-1">
                  {"Người tạo:"}
                  <span className="font-bold pl-1">{job.user_name}</span>
                </div>
                <div className="flex flex-row">
                  <UpdateJob id={job.job_id} />
                  <DeleteJob id={job.job_id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
