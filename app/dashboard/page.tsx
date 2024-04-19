import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import ProjectsTable from "@/app/ui/projects/table";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { fetchProjectsPages } from "@/app/lib/data";
import { Metadata } from "next";
import { CreateProject } from "../ui/projects/buttons";
import DashboardSkeleton from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Danh sách dự án",
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
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-emerald-700 text-2xl`}>
          Danh sách dự án
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Nhập tên, ngày (YYYY-MM-DD), phân loại.." />
        <CreateProject />
      </div>
      {
        <Suspense key={query + currentPage} fallback={<DashboardSkeleton />}>
          <ProjectsTable query={query} currentPage={currentPage} />
        </Suspense>
      }
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
