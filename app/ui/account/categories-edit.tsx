"use client";

import { Accounts } from "@/app/lib/definitions";
import { TagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { addCategory, deleteCategory } from "@/app/lib/actions";

export default function EditCategoriesForm({
  acc,
  categories,
}: {
  acc: Accounts;
  categories: string[];
}) {
  const addCate = addCategory.bind(null, acc.user_id);
  const deleteCate = deleteCategory.bind(null, acc.user_id);

  return (
    <div className="rounded-md bg-gray-50 p-4 mb-6 md:p-6">
      <form action={addCate}>
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Tạo phân loại mới
          </label>
          <div className="flex flex-row relative mt-2 rounded-md">
            <div className="relative w-full">
              <input
                id="category"
                name="category"
                placeholder=""
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <Button
              type="submit"
              className="justify-center w-20 ml-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-300 ease-in-out"
            >
              Thêm
            </Button>
          </div>
        </div>
      </form>
      <form action={deleteCate}>
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Xóa phân loại
          </label>
          <div className="flex flex-row relative mt-2 rounded-md">
            <div className="relative w-full">
              <select
                id="category"
                name="category"
                className="peer block w-full transition duration-200 ease-in-out rounded-md border-2 border-gray-200 focus:outline-none focus:border-emerald-500 py-[9px] pl-9 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="category-error"
              >
                <option value="" disabled>
                  Chọn phân loại
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <Button
              type="submit"
              className="justify-center w-20 ml-4 bg-yellow-600 hover:bg-red-500 active:bg-red-700 transition duration-300 ease-in-out"
            >
              Xóa
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
