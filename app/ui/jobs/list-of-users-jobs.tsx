import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchUsersJobs } from "@/app/lib/data";
import MembersProfilesList from "./member-list";
import JobStatus from "./status";

export default async function JobsTable({ id }: { id: string }) {
  const jobs = await fetchUsersJobs(id);

  if (jobs.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-gray-600 mb-4">
          BẠN CHƯA CÓ CÔNG VIỆC
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="flex justify-end w-full">
        <div className="min-w-full text-gray-900">
          {jobs?.map((job, index) => (
            <div key={job.job_id} className="flex justify-center w-full">
              <div
                className={`${lusitana.className} flex w-1/12 justify-center items-center text-emerald-700 text-3xl font-bold`}
              >
                {index + 1}.
              </div>
              <div className="py-3 mb-2 hover:bg-emerald-100 transition duration-300 ease-in-out rounded-l-lg rounded-r-none w-11/12">
                <div className="whitespace-nowrap p-3 pt-0">
                  <div className="flex items-center">
                    <div className="flex w-36">
                      <JobStatus status={job.status} />
                    </div>
                    <p
                      className={`${lusitana.className} text-lg font-extrabold text-emerald-800`}
                    >
                      {job.job_name}
                    </p>
                    <MembersProfilesList id={job.job_id} />
                  </div>
                </div>
                <div className="flex flex-row px-3 justify-between">
                  <div>
                    {"Hạn hoàn thành:"}
                    <span className="font-bold pl-1">
                      {formatDateToLocal(job.deadline)}
                    </span>
                  </div>
                  <div>
                    {"Người tạo:"}
                    <span className="font-bold pl-1">{job.user_name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
