const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ItemSkeleton() {
  return (
    <div className="w-full rounded-lg bg-neutral-100 hover:bg-emerald-100 transition duration-300 ease-in-out py-3 text-sm mb-2 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <div className="whitespace-nowrap p-3 pt-0">
        <div className="flex items-center justify-between">
          <p className="my-1 h-6 w-80 rounded-md bg-neutral-300"></p>
          <div className="flex flex-row gap-2">
            <div className="w-7 h-7 rounded-full bg-neutral-300" />
            <div className="w-7 h-7 rounded-full bg-neutral-300" />
            <div className="w-7 h-7 rounded-full bg-neutral-300" />
            <div className="w-7 h-7 rounded-full bg-neutral-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-row pl-3 pr-3 items-end justify-between justify-items-center">
        <div className="flex flex-col w-full gap-1">
          <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
          <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
        </div>
        <div className="flex w-full">
          <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
        </div>
        <div className="flex w-full">
          <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
        </div>
        <div className="h-4 w-80 rounded-md bg-neutral-200"></div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-neutral-50 p-2">
            <div className="hidden min-w-full text-gray-900 md:table">
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
