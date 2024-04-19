import { MembersField, ProjectForm } from "@/app/lib/definitions";
import JobsTable from "@/app/ui/jobs/list-of-jobs";
import PdfDownloadButton from "./create-pdf";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/quanlycongviec.com.svg";
import Time from "./timestamp";

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

  return (
    <main>
      <div
        id={project.project_name}
        className="rounded-md bg-gray-50 p-4 md:p-6"
      >
        <div className="flex flex-row justify-between items-start mb-16">
          <Image src={logo} alt="logo" width={400} height={50} priority />
          <div>
            <div>Mã dự án: {project.project_id}</div>
            <div>Người tạo dự án: {project.user_name}</div>
            <Time />
          </div>
        </div>
        <div className="flex flex-row mb-8 justify-center text-4xl font-bold uppercase items-center">
          báo cáo: {project.project_name}
        </div>
        <div>Phân loại dự án: {project.category}</div>
        <div>
          Ngày bắt đầu:{" "}
          {adjustedStartDate
            ? adjustedStartDate.toISOString().split("T")[0]
            : ""}
        </div>
        <div>
          Ngày kết thúc:{" "}
          {adjustedEndDate ? adjustedEndDate.toISOString().split("T")[0] : ""}
        </div>
        <div className="font-semibold text-lgs my-2">DANH SÁCH THÀNH VIÊN</div>
        <div className="mb-4">
          {members.map((member) => (
            <div key={member.user_id} className="flex items-center mb-2">
              <Image
                className="rounded-full w-8 inline-block mr-2 justify-center"
                src={member.profile_url}
                width={200}
                height={200}
                alt={member.profile_url ?? "Profile Pic"}
                priority={true}
              />
              {member.user_name}
            </div>
          ))}
        </div>
        <div className="font-semibold text-lgs mb-2">MÔ TẢ</div>
        <div className="mb-4">{project.description}</div>
        <div className="font-semibold text-lgs mb-2">DANH SÁCH CÔNG VIỆC</div>
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
