import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocalNoHour } from "@/app/lib/utils";
import { fetchSearchedProjects } from "@/app/lib/data";
import MembersProfilesList from "../projects/member-list";
import JobsTable from "./list-of-users-jobs";
import Image from "next/image";

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await fetchSearchedProjects(query, currentPage);

  if (projects.length === 0) {
    return (
      <div className="flex flex-col mt-6 items-center gap-5">
        <Image
          src="/no-results.png"
          alt="logo"
          width={200}
          height={50}
          priority
        />
        <p className="text-3xl font-bold text-gray-600 mb-4">
          KHÔNG TÌM THẤY DỰ ÁN
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="min-w-full text-gray-900">
          {projects?.map((project) => (
            <div
              key={project.project_id}
              className="w-full rounded-lg bg-neutral-100 py-3 text-sm mb-2 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
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
                <div className="flex flex-col w-full">
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
                <div className="flex flex-col w-full items-end">
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
              <JobsTable id={project.project_id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
