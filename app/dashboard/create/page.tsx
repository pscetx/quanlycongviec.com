import Form from "@/app/ui/projects/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchMembers, fetchCategories } from "@/app/lib/data";
import { Metadata } from "next";
import { NotificationsButton } from "@/app/ui/notifications/noti-button";

export const metadata: Metadata = {
  title: "Tạo dự án",
};

export default async function Page() {
  const members = await fetchMembers();
  const categories = await fetchCategories();

  return (
    <main>
      <div className="flex flex-row justify-between">
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
        <NotificationsButton />
      </div>
      <Form members={members} categories={categories} />
    </main>
  );
}
