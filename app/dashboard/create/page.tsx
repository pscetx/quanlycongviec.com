import Form from "@/app/ui/projects/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchMembers } from "@/app/lib/data";

export default async function Page() {
  const members = await fetchMembers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Projects", href: "/dashboard/" },
          {
            label: "Create Projects",
            href: "/dashboard/create",
            active: true,
          },
        ]}
      />
      <Form members={members} />
    </main>
  );
}
