import { lusitana } from "@/app/ui/fonts";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import AccountInfo from "@/app/ui/account/info";

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Tài khoản
      </h1>
      {/* <AccountInfo /> */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-white bg-yellow-600 p-3 text-sm font-medium hover:bg-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Đăng xuất</div>
        </button>
      </form>
    </main>
  );
}
