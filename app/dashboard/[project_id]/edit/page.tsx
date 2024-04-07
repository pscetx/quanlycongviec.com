import Form from "@/app/ui/projects/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  fetchCategories,
  fetchMembers,
  fetchProjectById,
} from "@/app/lib/data";
import { notFound } from "next/navigation";

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
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dự án", href: "/dashboard/" },
          {
            label: "Chỉnh sửa",
            href: `/dashboard/${project_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form project={project} members={members} categories={categories} />
    </main>
  );
}
