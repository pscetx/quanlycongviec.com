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

  if (projects.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-3xl font-bold text-gray-600 mb-4">
          KHÔNG TÌM THẤY DỰ ÁN
        </p>
        <div className="bg-gradient-to-r from-emerald-400 to-green-500 py-2 px-4 rounded-md inline-block text-white text-lg font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
          <a href="/dashboard/create">Chần chừ gì nữa tạo dự án mới thôi!</a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-neutral-50 p-2">
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
            {projects?.map((project) => (
              <div
                key={project.project_id}
                className="w-full rounded-lg bg-neutral-100 hover:bg-emerald-100 transition duration-300 ease-in-out py-3 text-sm mb-2 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <div className="whitespace-nowrap p-3 pt-0">
                  <div className="flex items-center">
                    <p
                      className={`${lusitana.className} text-xl font-extrabold text-emerald-800`}
                    >
                      {project.project_name}
                    </p>
                    <MembersProfilesList id={project.project_id} />
                  </div>
                </div>
                <div className="flex flex-row pl-3 pr-3 items-end justify-between justify-items-center">
                  <div className="flex flex-col w-full">
                    <div>
                      {"Ngày bắt đầu:"}
                      <span className="italic pl-2">
                        {formatDateToLocal(project.start_date)}
                      </span>
                    </div>
                    <div>
                      {"Ngày kết thúc:"}
                      <span className="italic pl-2">
                        {formatDateToLocal(project.end_date)}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full">
                    {"Phân loại:"}
                    <span className="font-bold pl-2">{project.category}</span>
                  </div>
                  <div className="flex w-full">
                    {"Người tạo:"}
                    <span className="font-bold pl-2">{project.user_name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
