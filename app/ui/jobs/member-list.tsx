import Image from "next/image";
import { fetchJobsMembersProfilesList } from "@/app/lib/data";

export default async function JobsMembersProfilesList({ id }: { id: string }) {
  const profilesList = await fetchJobsMembersProfilesList(id);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-row justify-end items-center">
        <div className="flex flex-wrap justify-end">
          {profilesList.slice(0, 7).map((job) => (
            <div key={job.project_id} className="relative inline-block">
              <Image
                src={job.profile_url}
                alt={`Profile picture of ${job.email}`}
                className="mr-1 rounded-full"
                width={30}
                height={30}
              />
              <div className="absolute top-0 left-0 z-10 opacity-0 hover:opacity-100 transition duration-300 ease-in-out w-full h-full">
                <div className="absolute bottom-4 right-5 rounded-sm bg-neutral-600 text-white p-1">
                  {job.user_name}
                  <div className="text-xs italic">{job.email}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {profilesList.length > 7 && (
          <div className="text-xl font-extrabold text-emerald-800">
            +{profilesList.length - 7}
          </div>
        )}
      </div>
    </div>
  );
}
