import Form from "@/app/ui/projects/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchMembers, fetchCategories } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo dự án",
};

export default async function Page() {
  const members = await fetchMembers();
  const categories = await fetchCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Danh sách dự án", href: "/dashboard/" },
          {
            label: "Tạo mới",
            href: "/dashboard/create",
            active: true,
          },
        ]}
      />
      <Form members={members} categories={categories} />
    </main>
  );
}
