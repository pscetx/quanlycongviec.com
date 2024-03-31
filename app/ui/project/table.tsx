import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchSearchedProjects } from "@/app/lib/data";
import MembersProfilesList from "./member-list";

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await fetchSearchedProjects(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {projects?.map((project) => (
              <div
                key={project.project_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{project.project_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      Ngày bắt đầu : {formatDateToLocal(project.start_date)}
                    </p>
                    <p>Ngày kết thúc: {formatDateToLocal(project.end_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden min-w-full text-gray-900 md:table">
            <div className="bg-white">
              {projects?.map((project) => (
                <div
                  key={project.project_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <div className="whitespace-nowrap p-3">
                    <div className="flex items-center">
                      <p
                        className={`${lusitana.className} text-xl font-extrabold text-emerald-800`}
                      >
                        {project.project_name}
                      </p>
                      <MembersProfilesList id={project.project_id} />
                    </div>
                  </div>
                  <div className="flex flex-row pl-3 pr-3 items-end justify-between">
                    <div className="flex flex-col italic">
                      <div>
                        {"Ngày bắt đầu : " +
                          formatDateToLocal(project.start_date)}
                      </div>
                      <div>
                        {"Ngày kết thúc: " +
                          formatDateToLocal(project.end_date)}
                      </div>
                    </div>
                    <div>{"Phân loại: " + project.category}</div>
                    <div>{"Người tạo: " + project.user_name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
