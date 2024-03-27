import { lusitana } from "@/app/ui/fonts";
import { getServerSession } from "next-auth";
import LogOut from "@/app/ui/account/logout";
import { redirect } from "next/navigation";
import AccountInfo from "@/app/ui/account/info";

export default async function Page() {
  const session = await getServerSession();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Tài khoản
      </h1>
      {/* <AccountInfo /> */}
      {!!session && <LogOut />}
      {!session && redirect("/")}
    </main>
  );
}
