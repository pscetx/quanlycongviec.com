import { lusitana } from "./fonts";

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
        <div className="h-6 w-64 rounded-md bg-neutral-200"></div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden`}>
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

export function MyJobsSkeleton() {
  return (
    <main className={`${shimmer} relative overflow-hidden`}>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="min-w-full text-gray-900">
            <div className="w-full rounded-lg bg-neutral-100 py-3 text-sm mb-3 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <div className="whitespace-nowrap p-3 pt-0 pl-6">
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
              <div className="flex flex-row pl-6 pr-3 items-end justify-between">
                <div className="flex flex-col w-full gap-1">
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                </div>
              </div>
              <div className="mt-2 ml-6 h-4 w-96 rounded-md bg-neutral-300"></div>
              <div className="mt-6 flow-root">
                <div className="flex justify-end w-full">
                  <div className="min-w-full text-gray-900">
                    <div className="flex justify-center w-full">
                      <div
                        className={`${lusitana.className} flex w-1/12 justify-center items-center text-emerald-700 text-3xl font-bold`}
                      >
                        1.
                      </div>
                      <div className="py-3 mb-2 border-t border-l hover:bg-emerald-100 transition duration-300 ease-in-out rounded-l-lg rounded-r-none w-11/12">
                        <div className="flex justify-between items-center whitespace-nowrap p-3 pt-0">
                          <div className="flex flex-row items-center">
                            <p className="my-1 h-6 w-64 rounded-md bg-neutral-300"></p>
                            <div className="ml-3">
                              <div className="h-6 w-24 rounded-md bg-neutral-200"></div>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2">
                            <div className="w-7 h-7 rounded-full bg-neutral-300" />
                            <div className="w-7 h-7 rounded-full bg-neutral-300" />
                            <div className="w-7 h-7 rounded-full bg-neutral-300" />
                            <div className="w-7 h-7 rounded-full bg-neutral-300" />
                          </div>
                        </div>
                        <div className="flex flex-row mb-1 px-3 justify-between">
                          <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                          <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                        </div>
                        <div className="h-4 ml-3 mb-1 w-96 rounded-md bg-neutral-300"></div>
                        <div className="h-4 ml-3 mb-1 w-96 rounded-md bg-neutral-200"></div>
                        <div className="flex flex-row mt-2 mx-3 gap-3">
                          <div className="h-6 w-11/12 rounded-md bg-neutral-300"></div>
                          <div className="h-6 w-1/12 rounded-md bg-neutral-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="min-w-full text-gray-900">
            <div className="w-full rounded-lg bg-neutral-100 py-3 text-sm mb-3 last-of-type:mb-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <div className="whitespace-nowrap p-3 pt-0 pl-6">
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
              <div className="flex flex-row pl-6 pr-3 items-end justify-between">
                <div className="flex flex-col w-full gap-1">
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                  <div className="h-4 w-40 rounded-md bg-neutral-300"></div>
                </div>
              </div>
              <div className="mt-2 ml-6 h-4 w-96 rounded-md bg-neutral-300"></div>
              <div className="flex flex-col my-4 items-center">
                <div className="h-6 w-64 rounded-md bg-neutral-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
