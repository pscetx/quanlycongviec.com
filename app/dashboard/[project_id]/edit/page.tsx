import Form from "@/app/ui/projects/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  fetchCategories,
  fetchMembers,
  fetchProjectById,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết dự án",
};

export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  const project_id = params.project_id;
  const [project, members, categories] = await Promise.all([
    fetchProjectById(project_id),
    fetchMembers(),
    fetchCategories(),
  ]);
  if (!project) {
    notFound();
  }
  const project_name = project.project_name;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Danh sách dự án", href: "/dashboard/" },
          {
            label: project_name,
            href: `/dashboard/${project_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form project={project} members={members} categories={categories} />
    </main>
  );
}
