import { lusitana } from "@/app/ui/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import {
  getCurrentUserId,
  fetchUserById,
  fetchCategories,
} from "@/app/lib/data";
import EditUserForm from "@/app/ui/account/edit-form";
import EditPasswordForm from "@/app/ui/account/pass-change";
import EditCategoriesForm from "@/app/ui/account/categories-edit";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Tài khoản",
};

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    revalidatePath("/");
    redirect("/");
  }
  const currentUserId = await getCurrentUserId(session);
  const acc = await fetchUserById(currentUserId);
  const categories = await fetchCategories();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Tài khoản
      </h1>
      <EditCategoriesForm acc={acc} categories={categories} />
      <EditPasswordForm acc={acc} />
      <EditUserForm acc={acc} />
    </main>
  );
}
