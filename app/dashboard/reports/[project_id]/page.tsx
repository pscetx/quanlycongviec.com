import Form from "@/app/ui/reports/details";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchProjectsMembers, fetchProjectById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NotificationsButton } from "@/app/ui/notifications/noti-button";

export const metadata: Metadata = {
  title: "Chi tiết dự án",
};

export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  const project_id = params.project_id;
  const [project, members] = await Promise.all([
    fetchProjectById(project_id),
    fetchProjectsMembers(project_id),
  ]);
  if (!project) {
    notFound();
  }
  const project_name = project.project_name;

  return (
    <main>
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Báo cáo", href: "/dashboard/reports" },
            {
              label: project_name,
              href: `/dashboard/reports/${project_id}`,
              active: true,
            },
          ]}
        />
        <NotificationsButton />
      </div>
      <Form project={project} members={members} />
    </main>
  );
}
