import Image from "next/image";
import "@/app/ui/global.css";
import Form from "../ui/register-form";

export default async function Home() {
  return (
    <main className="bg-neutral-800 min-h-screen flex-col items-center justify-between">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <Image
          src="/quanlycongviec.com-white.svg"
          alt="logo"
          width={400}
          height={50}
          priority
        />
        <div className="bg-neutral-50 rounded-xl mt-10 p-10 z-20 sm:mx-auto sm:w-full sm:max-w-md">
          <Form />
        </div>
      </div>
      <Image
        className="absolute bottom-0 left-0 w-full z-10"
        src="/graphic-night.svg"
        alt="graphic"
        width={400}
        height={50}
        priority
      />
    </main>
  );
}
