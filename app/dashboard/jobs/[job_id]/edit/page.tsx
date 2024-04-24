import Form from "@/app/ui/jobs/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  fetchJobsMembers,
  fetchJobById,
  fetchProjectById,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết công việc",
};

export default async function Page({ params }: { params: { job_id: string } }) {
  const job_id = params.job_id;
  const job = await fetchJobById(job_id);
  if (!job) {
    notFound();
  }

  const project_id = job.project_id;
  const project = await fetchProjectById(project_id);
  const members = await fetchJobsMembers(job_id);
  const project_name = project.project_name;
  const job_name = job.job_name;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Danh sách dự án", href: "/dashboard/" },
          {
            label: project_name,
            href: `/dashboard/${project_id}/edit`,
          },
          {
            label: job_name,
            href: `/dashboard/jobs/${job_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form job={job} members={members} />
    </main>
  );
}
