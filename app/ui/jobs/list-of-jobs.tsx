import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchJobs } from "@/app/lib/data";
import MembersProfilesList from "./member-list";
import JobStatus from "./status";

export default async function JobsTable({ id }: { id: string }) {
  const jobs = await fetchJobs(id);

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
              <div className="flex flex-row pl-3 pr-3 justify-between items-center">
                <div>
                  {"Hạn hoàn thành:"}
                  <span className="italic pl-2">
                    {formatDateToLocal(job.deadline)}
                  </span>
                </div>
                <div>
                  <JobStatus status={job.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
