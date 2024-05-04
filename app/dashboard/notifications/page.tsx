import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Suspense } from "react";
import { Metadata } from "next";
import { JobsNotificationsSkeleton } from "@/app/ui/skeletons";
import NotificationsTable from "@/app/ui/notifications/noti-table";

export const metadata: Metadata = {
  title: "Thông báo của tôi",
};

export default async function Page() {
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Danh sách dự án", href: "/dashboard/" },
          {
            label: "Thông báo của tôi",
            href: `/dashboard/notifications`,
            active: true,
          },
        ]}
      />
      {
        <Suspense fallback={<JobsNotificationsSkeleton />}>
          <NotificationsTable />
        </Suspense>
      }
    </div>
  );
}
