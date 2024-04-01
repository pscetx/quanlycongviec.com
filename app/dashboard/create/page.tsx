import Form from "@/app/ui/projects/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchMembers } from "@/app/lib/data";

export default async function Page() {
  const members = await fetchMembers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dự án", href: "/dashboard/" },
          {
            label: "Tạo dự án",
            href: "/dashboard/create",
            active: true,
          },
        ]}
      />
      <Form members={members} />
    </main>
  );
}
