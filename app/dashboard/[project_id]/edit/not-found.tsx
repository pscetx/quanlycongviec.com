import Link from "next/link";
import Image from "next/image";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Image src="/404.png" alt="logo" width={400} height={50} priority />
      <p className="text-xl font-semibold">
        Dự án không tồn tại hoặc bạn không có quyền truy cập :(
      </p>
      <Link
        href="/dashboard/"
        className="font-semibold mt-6 rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-500 transition duration-300 ease-in-out"
      >
        <ArrowLongLeftIcon />
        QUAY LẠI
      </Link>
    </main>
  );
}
