import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import { deleteProject } from '@/app/lib/actions';

export function CreateProject() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center bg-gradient-to-r from-emerald-400 to-green-500 py-2 px-4 rounded-md inline-block text-white text-lg font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
    >
      <span className="hidden md:block">Tạo dự án</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// export function UpdateInvoice({ id }: { id: string }) {
//   return (
//     <Link
//       href={`/dashboard/invoices/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);
//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
