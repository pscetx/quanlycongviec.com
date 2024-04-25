import { MembersField, ProjectForm } from "@/app/lib/definitions";
import JobsTable from "@/app/ui/reports/list-of-jobs";
import PdfDownloadButton from "./create-pdf";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/quanlycongviec.com.svg";
import Time from "./timestamp";
import { CurrentUser } from "./current-user";

export default function ReportForm({
  project,
  members,
}: {
  project: ProjectForm;
  members: MembersField[];
}) {
  const startDate = project.start_date ? new Date(project.start_date) : null;
  const endDate = project.end_date ? new Date(project.end_date) : null;
  const gmtPlus7Offset = 7 * 60 * 60 * 1000;
  const adjustedStartDate = startDate
    ? new Date(startDate.getTime() + gmtPlus7Offset)
    : null;
  const adjustedEndDate = endDate
    ? new Date(endDate.getTime() + gmtPlus7Offset)
    : null;
  const id = CurrentUser();

  return (
    <main>
      <div id={project.project_name} className="rounded-md bg-white p-10 pl-20">
        <div className="flex flex-row justify-between items-start mb-16">
          <Image src={logo} alt="logo" width={400} height={50} priority />
          <div>
            <div>Mã dự án: {project.project_id}</div>
            <div className="flex flex-row gap-1">Mã người tạo: {id}</div>
            <Time />
          </div>
        </div>
        <div className="flex flex-col mb-8 justify-center text-3xl font-semibold uppercase items-center">
          BÁO CÁO
          <div className="text-4xl font-bold">{project.project_name}</div>
        </div>
        <div className="font-semibold text-lg mb-2">I. THÔNG TIN DỰ ÁN</div>
        <div className="flex flex-row mb-2 items-end justify-between justify-items-center">
          <div className="w-full">
            Họ và tên người tạo dự án: {project.user_name}
          </div>
          <div className="w-full">Email: {project.email}</div>
        </div>
        <div className="mb-2">Phân loại dự án: {project.category}</div>
        <div className="flex flex-row mb-2 items-end justify-between justify-items-center">
          <div className="w-full">
            Ngày bắt đầu:{" "}
            {adjustedStartDate
              ? adjustedStartDate.toISOString().split("T")[0]
              : ""}
          </div>
          <div className="w-full">
            Ngày kết thúc:{" "}
            {adjustedEndDate ? adjustedEndDate.toISOString().split("T")[0] : ""}
          </div>
        </div>
        <div className="mb-2">Mô tả dự án: {project.description}</div>
        <div>
          Nhận xét chung: <textarea rows={1} className="w-full mt-2 mb-2" />
        </div>
        <div className="font-semibold text-lg mb-2">
          II. DANH SÁCH THÀNH VIÊN
        </div>
        <div className="mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black w-10 py-2">STT</th>
                <th className="border border-black px-4 py-2">Họ và tên</th>
                <th className="border border-black px-4 py-2">Email</th>
                <th className="border border-black w-24 py-2">Lượng việc</th>
                <th className="border border-black px-4 py-2">Nhận xét</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member.user_id}>
                  <td className="border border-black py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black px-2 py-2">
                    {member.user_name}
                  </td>
                  <td className="border border-black px-2 py-2">
                    {member.email}
                  </td>
                  <td className="border border-black py-2 text-center">
                    {member.job_count}
                  </td>
                  <td className="border border-black px-2 py-2">
                    <textarea rows={1} className="w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="font-semibold text-lg mb-2">
          III. DANH SÁCH CÔNG VIỆC
        </div>
        <JobsTable id={project.project_id} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/reports`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Hủy
        </Link>
        <PdfDownloadButton contentId={project.project_name} />
      </div>
    </main>
  );
}
