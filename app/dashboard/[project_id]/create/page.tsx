import Form from "@/app/ui/jobs/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchProjectsMembers, fetchProjectById } from "@/app/lib/data";
import { Metadata } from "next";
import { NotificationsButton } from "@/app/ui/notifications/noti-button";

export const metadata: Metadata = {
  title: "Tạo công việc",
};

export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  const project_id = params.project_id;
  const project = await fetchProjectById(project_id);
  const project_name = project.project_name;
  const members = await fetchProjectsMembers(project_id);
  return (
    <main>
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Danh sách dự án", href: "/dashboard/" },
            {
              label: project_name,
              href: `/dashboard/${project_id}/edit`,
            },
            {
              label: "Tạo công việc mới",
              href: `/dashboard/${project_id}/create`,
              active: true,
            },
          ]}
        />
        <NotificationsButton />
      </div>
      <Form id={project_id} members={members} />
    </main>
  );
}
