import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { Metadata } from "next";
import DashboardSkeleton from "@/app/ui/skeletons";
import NotificationsTable from "@/app/ui/notifications/noti-table";

export const metadata: Metadata = {
  title: "Thông báo của tôi",
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-emerald-700 text-2xl`}>
          Thông báo của tôi
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
      {
        <Suspense fallback={<DashboardSkeleton />}>
          <NotificationsTable />
        </Suspense>
      }
    </div>
  );
}
