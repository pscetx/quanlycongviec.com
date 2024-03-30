import clsx from "clsx";
import Image from "next/image";
import { fetchMembersProfilesList } from "@/app/lib/data";

export default async function MembersProfilesList({ id }: { id: string }) {
  // Remove props
  const latestInvoices = await fetchMembersProfilesList(id);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {
          <div className="bg-white px-6">
            {latestInvoices.map((project, i) => {
              return (
                <div
                  key={project.project_id}
                  className={clsx(
                    "flex flex-row items-center justify-between py-4",
                    {
                      "border-t": i !== 0,
                    }
                  )}
                >
                  <div className="flex items-center">
                    <Image
                      src={project.profile_url}
                      alt={`profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
}
