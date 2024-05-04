import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import ProjectsTable from "@/app/ui/jobs/table";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { fetchProjectsPages } from "@/app/lib/data";
import { Metadata } from "next";
import { MyJobsSkeleton } from "@/app/ui/skeletons";
import { NotificationsButton } from "@/app/ui/notifications/noti-button";

export const metadata: Metadata = {
  title: "Công việc của tôi",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-emerald-700 text-2xl`}>
            Công việc của tôi
          </h1>
        </div>
        <NotificationsButton />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Nhập tên, ngày (YYYY-MM-DD), phân loại.." />
      </div>
      {
        <Suspense key={query + currentPage} fallback={<MyJobsSkeleton />}>
          <ProjectsTable query={query} currentPage={currentPage} />
        </Suspense>
      }
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
