import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/project/table";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { fetchProjectsPages } from "@/app/lib/data";
import { Metadata } from "next";

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
        <h2 className={`${lusitana.className} text-xl`}>Danh sách dự án</h2>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Tìm kiếm dự án..." />
      </div>
      {
        <Suspense key={query + currentPage}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      }
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
